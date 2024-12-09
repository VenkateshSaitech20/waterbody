'use client';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';

const ReviewMap = ({ gpsCordinates }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                attributionControl: false
            }).setView([9.9087191, 78.1792263], 16);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(mapRef.current);
        }

        // Add polyline
        if (gpsCordinates && gpsCordinates.length > 0) {
            const latLngs = gpsCordinates.map((coord) => [coord.lat, coord.long]);
            const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(mapRef.current);
            mapRef.current.fitBounds(polyline.getBounds());
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [gpsCordinates]);

    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Map</Typography>
                <Divider className='mlb-4' />
                <Grid container className='bs-full' >
                    <Grid item xs={12} className="p-2">
                        <div className='mb-4' id="map" style={{ width: '100%', height: '500px' }}></div >
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

ReviewMap.propTypes = {
    gpsCordinates: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number.isRequired,
            long: PropTypes.number.isRequired,
            point: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ReviewMap;
