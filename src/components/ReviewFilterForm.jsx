import { useCallback, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import TextFieldStyled from '@core/components/mui/TextField';
import { responseData } from '@/utils/message';
import Loader from '@/components/loader';
import PropTypes from "prop-types";
import apiClient from '@/utils/apiClient';
import CustomInputLabel from '@/components/asterick';

const ReviewFilterForm = ({ setSearchFilter }) => {
    const [jurisdictionData, setJurisdictionData] = useState([]);
    const [nameData, setNameData] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [selectedJurisdiction, setSelectedJurisdiction] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [talukData, setTalukData] = useState([]);
    const [blockData, setBlockData] = useState([]);
    const [panchayatData, setPanchayatData] = useState([]);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { register, handleSubmit, control, setValue } = useForm();

    const getJurisdictions = async () => {
        const response = await apiClient.get("/api/master-data-settings/jurisdiction");
        if (response.data.result === true) {
            setJurisdictionData(response.data.message);
        } else if (response.data.result === false) {
            if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            }
        }
    };

    const handleName = async (jurId) => {
        setValue('name', '');
        setValue('ward', '');
        const selectedSlug = jurisdictionData.find(item => item.id === jurId)?.slug;
        setSelectedJurisdiction(selectedSlug || '');
        const response = await apiClient.post("/api/master-data-settings/urban-local-bodies/get-by-jurisdiction-id/", { id: jurId });
        if (response?.data?.result === true) {
            setNameData(response.data.message);
        } else if (response.data.result === false) {
            if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            }
        }
    }

    const handleWard = async (name) => {
        setValue('ward', '');
        const response = await apiClient.post("/api/master-data-settings/urban-local-bodies/get-ward-by-name/", { name: name });
        if (response?.data?.result === true) {
            setWardData(response.data.message);
        } else if (response.data.result === false) {
            if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            }
        }
    }

    const fetchDistrictsByStateId = useCallback(async () => {
        try {
            const response = await apiClient.post('/api/master-data-settings/city/get-cities-by-state-id', { stateId: 26 });
            if (response.data.result === true) {
                setDistrictData(response.data.message);
            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    }, []);

    const handleBlocks = (selectedTaluk) => {
        setValue("block", null);
        fetchBlocksByTalukId(selectedTaluk);
        setPanchayatData([]);
    };

    const fetchBlocksByTalukId = useCallback(async (selectedTaluk) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/block/get-blocks-by-taluk-id', { talukId: selectedTaluk });
            if (response.data.result === true) {
                setBlockData(response.data.message);
            }
        } catch (error) {
            console.error('Failed to fetch blocks:', error);
        }
    }, []);

    const handleTaluks = (selectedDistrict) => {
        setValue("taluk", null);
        fetchTaluksByDistrictId(selectedDistrict);
        setBlockData([]);
    };

    const fetchTaluksByDistrictId = useCallback(async (selectedDistrict) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/taluk/get-taluks-by-district-id', { districtId: selectedDistrict });
            if (response.data.result === true) {
                setTalukData(response.data.message);
            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    }, []);

    const handlePanchayats = (selectedBlock) => {
        setValue("panchayat", null);
        fetchPanchayatsByBlockId(selectedBlock);
    };

    const fetchPanchayatsByBlockId = useCallback(async (selectedBlock) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/panchayat/get-panchayats-by-block-id', { blockId: selectedBlock });
            if (response.data.result === true) {
                setPanchayatData(response.data.message);
            }
        } catch (error) {
            console.error('Failed to fetch blocks:', error);
        }
    }, []);

    useEffect(() => {
        getJurisdictions();
        fetchDistrictsByStateId();
    }, []);

    const handleOnSubmit = async (data) => {
        if (selectedJurisdiction == "village-panchayat") {
            delete data.name;
            delete data.ward;
        } else {
            delete data.district;
            delete data.taluk;
            delete data.block;
            delete data.panchayat;
        }
        setSearchFilter(data);
    };

    return (
        <form autoComplete='off' onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="flex flex-wrap gap-4">
                <Controller
                    name='jurisdiction'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                        <TextFieldStyled
                            select
                            className="min-w-[250px]"
                            id='jurisdiction'
                            label={<CustomInputLabel htmlFor='Jurisdiction' text='Jurisdiction' />}
                            size="small"
                            variant='filled'
                            InputLabelProps={{ shrink: true }}
                            {...field}
                            onChange={(event) => {
                                handleName(event.target.value);
                                field.onChange(event);
                            }}
                        >
                            <MenuItem value='' disabled>
                                Select jusrisdiction
                            </MenuItem>
                            {jurisdictionData?.map((item) => (
                                <MenuItem value={item.id} key={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextFieldStyled>
                    )}
                />
                {selectedJurisdiction == 'village-panchayat' ? (
                    <>
                        <Controller
                            name='district'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextFieldStyled
                                    select
                                    className="min-w-[250px]"
                                    id='district'
                                    label={<CustomInputLabel htmlFor='districtName' text='District Name' />}
                                    size="small"
                                    variant='filled'
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                    onChange={(event) => {
                                        handleTaluks(event.target.value);
                                        field.onChange(event);
                                    }}
                                >
                                    <MenuItem value='' disabled>
                                        Select City
                                    </MenuItem>
                                    {districtData?.map((city) => (
                                        <MenuItem value={city.id} key={city.id}>
                                            {city.name}
                                        </MenuItem>
                                    ))}
                                </TextFieldStyled>
                            )}
                        />
                        <Controller
                            name='taluk'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextFieldStyled
                                    select
                                    className="min-w-[250px]"
                                    id='taluk'
                                    label={<CustomInputLabel htmlFor='talukName' text='Taluk Name' />}
                                    size="small"
                                    variant='filled'
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                    onChange={(event) => {
                                        handleBlocks(event.target.value);
                                        field.onChange(event);
                                    }}
                                >
                                    <MenuItem value='' disabled>
                                        Select Taluk
                                    </MenuItem>
                                    {talukData?.map((taluk) => (
                                        <MenuItem value={taluk.id} key={taluk.id}>
                                            {taluk.name}
                                        </MenuItem>
                                    ))}
                                </TextFieldStyled>
                            )}
                        />
                        <Controller
                            name='block'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextFieldStyled
                                    select
                                    className="min-w-[250px]"
                                    id='block'
                                    label={<CustomInputLabel htmlFor='blockName' text='Block Name' />}
                                    size="small"
                                    variant='filled'
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                    onChange={(event) => {
                                        handlePanchayats(event.target.value);
                                        field.onChange(event);
                                    }}
                                >
                                    <MenuItem value='' disabled>Select Block</MenuItem>
                                    {blockData?.map((block) => (
                                        <MenuItem value={block.id} key={block.id}>{block.name}</MenuItem>
                                    ))}
                                </TextFieldStyled>
                            )}
                        />
                        <Controller
                            name='panchayat'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextFieldStyled
                                    select
                                    className="min-w-[250px]"
                                    id='panchayat'
                                    label={<CustomInputLabel htmlFor='panchayatName' text='Panchayat Name' />}
                                    size="small"
                                    variant='filled'
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                >
                                    <MenuItem value='' disabled>Select Panchayat</MenuItem>
                                    {panchayatData?.map((panchayat) => (
                                        <MenuItem value={panchayat.id} key={panchayat.id}>{panchayat.name}</MenuItem>
                                    ))}
                                </TextFieldStyled>
                            )}
                        />
                    </>
                ) : (
                    <>
                        <Controller
                            name='name'
                            control={control}
                            defaultValue=''
                            render={
                                ({ field }) => (
                                    <TextFieldStyled
                                        select
                                        className="min-w-[250px]"
                                        id='name'
                                        label={<CustomInputLabel htmlFor='Name' text='Name' />}
                                        size="small"
                                        variant='filled'
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        onChange={(event) => {
                                            handleWard(event.target.value);
                                            field.onChange(event);
                                        }}
                                    >
                                        <MenuItem value='' disabled>
                                            Select Name
                                        </MenuItem>
                                        {nameData?.map((item) => (
                                            <MenuItem value={item.name} key={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </TextFieldStyled>
                                )}
                        />
                        <Controller
                            name='ward'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <TextFieldStyled
                                    select
                                    className="min-w-[250px]"
                                    id='ward'
                                    label={<CustomInputLabel htmlFor='Ward' text='Ward' />}
                                    size="small"
                                    variant='filled'
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                >
                                    <MenuItem value='' disabled>
                                        Select ward
                                    </MenuItem>
                                    {wardData?.map((item) => (
                                        <MenuItem value={item.ward} key={item.id}>
                                            {item.ward}
                                        </MenuItem>
                                    ))}
                                </TextFieldStyled>
                            )}
                        />
                    </>
                )
                }
                <TextFieldStyled
                    className="min-w-[250px]"
                    variant='filled'
                    size={"small"}
                    InputLabelProps={{ shrink: true }}
                    label={<CustomInputLabel htmlFor='Search by waterbody id' text='Search by waterbody id' />}
                    {...register('waterBodyId')}
                />
                <Button variant='contained' type='submit'>
                    {isButtonLoading ? <Loader type="btnLoader" /> : "Search"}
                </Button>
            </div >
        </form >
    )
}

ReviewFilterForm.propTypes = {
    open: PropTypes.any,
    handleClose: PropTypes.func,
    handleDataAdded: PropTypes.func,
};

export default ReviewFilterForm
