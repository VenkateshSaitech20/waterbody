'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import apiWBDClient from '@/utils/apiWBDClient';
import { Card, CardContent, Grid, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TextFieldStyled from '@/@core/components/mui/TextField';
import { registerData, waterBodyMapType } from '@/utils/message';
import PropTypes from "prop-types";
import Loader from '../loader';

const WaterBodyMap = ({ height, filter, flag }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [mapData, setMapData] = useState(null);
    const [geoJsonPath, setGeoJsonPath] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [landingPageMap, setLandingPageMap] = useState(false);
    const [mapType, setMapType] = useState('pwdTanks');
    const geojsonLayerRef = useRef(null);
    const sidePanelRef = useRef(null);
    const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);
    const [featureProperties, setFeatureProperties] = useState(null);
    const { control, setValue } = useForm({});

    const getMapData = async () => {
        setIsLoading(true);
        try {
            const { data: { result, message } } = await apiWBDClient.post('/water-body/map/get', { district: "madurai" });
            if (result) {
                setMapData(message);
            } else {
                setError(message);
            }
        } catch (err) {
            setError("Failed to fetch map data");
        }
        setIsLoading(false);
    };
    useEffect(() => {
        setValue('mapType', mapType);
        getMapData();
        if (flag === "landing-page-map") {
            setLandingPageMap(true);
        }
    }, []);
    useEffect(() => {
        if (mapData) {
            const selectedMap = mapData?.geoJsonFiles[mapType]?.path;
            if (selectedMap) {
                setGeoJsonPath(selectedMap);
            }
        };
        setIsSidePanelVisible(false);
    }, [mapType, mapData]);

    useEffect(() => {
        if (!mapRef.current || !geoJsonPath) return;

        const loadGeoJson = async () => {
            try {
                if (!mapInstance.current) {
                    mapInstance.current = L.map(mapRef.current, {
                        preferCanvas: true,
                        zoomControl: true,
                        attributionControl: false
                    }).setView([9.9253, 78.1198], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        maxZoom: 19
                    }).addTo(mapInstance.current);
                }

                const response = await fetch(geoJsonPath);
                if (!response.ok) {
                    throw new Error('GeoJSON file not found');
                }

                const localGeoJson = await response.json();

                if (geojsonLayerRef.current) {
                    geojsonLayerRef.current.clearLayers();
                }

                geojsonLayerRef.current = L.geoJSON(localGeoJson, {
                    style: {
                        fillColor: '#3388ff',
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    },
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            click: (e) => {
                                const properties = e.target.feature.properties;
                                setFeatureProperties(properties);
                                mapInstance.current.fitBounds(e.target.getBounds(), {
                                    padding: [200, 50],
                                    maxZoom: 16
                                });
                                setIsSidePanelVisible(true);
                            }
                        });
                    }
                }).addTo(mapInstance.current);

                const bounds = geojsonLayerRef.current.getBounds();
                if (bounds.isValid()) {
                    mapInstance.current.fitBounds(bounds, {
                        padding: [50, 50],
                        maxZoom: 16
                    });
                }
            } catch (err) {
                setError(err.message);
            }
        };

        loadGeoJson();

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [geoJsonPath]);

    useEffect(() => {
        if (featureProperties && sidePanelRef.current) {
            const featureInfo = sidePanelRef.current.querySelector('#feature-info');
            if (featureInfo) {
                featureInfo.innerHTML = Object.entries(featureProperties)
                    .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                    .join('<br/>');
            }
        }
    }, [featureProperties]);

    const renderMap = () => (
        <Grid container spacing={6}>
            {filter === "Y" && (<Grid item xs={12} sm={12}>
                <Controller
                    name="mapType"
                    control={control}
                    rules={{ required: registerData.roleNameReq }}
                    defaultValue={mapType}
                    render={({ field }) => (
                        <TextFieldStyled
                            select
                            className="min-w-[250px]"
                            variant="filled"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            id="select-map-filtering"
                            label="Map Filtering"
                            {...field}
                            onChange={(e) => {
                                setMapType(e.target.value);
                                field.onChange(e);
                            }}
                        >
                            {waterBodyMapType?.map((type) => (
                                <MenuItem value={type?.value} key={type.id}>
                                    {type?.name}
                                </MenuItem>
                            ))}
                        </TextFieldStyled>
                    )}
                />
            </Grid>)}
            {/* <Grid item xs={12} sm={filter === "Y" ? 8 : 8}> */}
            <Grid item xs={12} sm={8}>
                <div ref={mapRef} className={`${height}`} />
            </Grid>
            {/* <Grid item xs={12} sm={filter === "Y" ? 4 : 4}> */}
            <Grid item xs={12} sm={4}>
                <h3 className="text-lg font-bold">Feature Information</h3>
                <smmal>Click the waterbody to view the meta data</smmal>
                {isSidePanelVisible && (
                    <div ref={sidePanelRef} style={{ height: '500px', overflowY: 'scroll' }}>
                        <div id="feature-info"></div>
                    </div>
                )}
            </Grid>
        </Grid>
    )

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (
                <>
                    {error && (
                        <div className="flex justify-center items-center w-full bottom-0 z-10 mb-3">
                            <div className="bg-red-100 border border-red-400 text-red-700 text-center px-4 py-3 rounded">
                                <p>{error}</p>
                            </div>
                        </div>
                    )}
                    <Grid item xs={12} md={12}>
                        {landingPageMap ? (
                            renderMap()
                        ) : (
                            <Card color='primary'>
                                <CardContent className='flex flex-col gap-6'>
                                    {renderMap()}
                                </CardContent>
                            </Card>
                        )}

                    </Grid>
                </>
            )
            }
        </>
    );
};

WaterBodyMap.propTypes = {
    height: PropTypes.any,
    filter: PropTypes.any,
    flag: PropTypes.any,
};

export default dynamic(() => Promise.resolve(WaterBodyMap), { ssr: false });
