'use client'
import Loader from '@/components/loader';
import { useCallback, useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import { showToast } from '@/utils/helper';
import { Typography, Card, CardHeader, CardContent, Button, Grid, MenuItem } from '@mui/material';
import TextFieldStyled from '@/@core/components/mui/TextField';
import { Controller, useForm } from 'react-hook-form';
import CustomInputLabel from '@/components/asterick';
import { registerData, responseData } from '@/utils/message';

const Panchayat = () => {
    const [fileInput, setFileInput] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [isDwnldBtnLoading, setIsDwnldBtnLoading] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [talukData, setTalukData] = useState([]);
    const [blockData, setBlockData] = useState([]);
    const [apiErrors, setApiErrors] = useState({});
    const [isStateDisabled, setIsStateDisabled] = useState(true);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
    const [isTalukDisabled, setIsTalukDisabled] = useState(true);
    const [isBlockDisabled, setIsBlockDisabled] = useState(true);
    const { handleSubmit, formState: { errors }, control } = useForm();

    const handleFileChange = (e) => {
        setFileInput(e.target.files[0]);
    };

    const handleOnSubmit = async (data) => {
        setApiErrors({});
        setIsButtonLoading(true);
        const formData = new FormData();
        formData.append("file", fileInput);
        formData.append('countryId', data.countryId)
        formData.append('stateId', data.stateId)
        formData.append('districtId', data.districtId)
        formData.append('talukId', data.talukId)
        formData.append('blockId', data.blockId)
        const response = await apiClient.post('/api/bulk-import/import-panchayats', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.result === true) {
            showToast(true, response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            setApiErrors(response.data.message)
        }
        setIsButtonLoading(false);
    };

    const handleExport = async (fileType) => {
        try {
            setIsDwnldBtnLoading(true);
            const response = await apiClient.post('/api/bulk-import/export-excel', { fileType }, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileType}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setIsDwnldBtnLoading(false);
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const getCountries = async () => {
        const response = await apiClient.get("/api/master-data-settings/country");
        if (response.data.result === true) {
            setCountryData(response.data.message);
        } else if (response.data.result === false) {
            if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            }
        }
    };

    const handleStates = (selectedCountry) => {
        fetchStatesByCountryId(selectedCountry);
        setDistrictData([]);
        setIsDistrictDisabled(true);
    };

    const fetchStatesByCountryId = useCallback(async (selectedCountry) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/state/get-by-country-id', { countryId: selectedCountry });
            if (response.data.result === true) {
                setStateData(response.data.message);
                setIsStateDisabled(false);
            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    }, []);

    const handleDistricts = (selectedState) => {
        fetchDistrictsByStateId(selectedState);
    };

    const fetchDistrictsByStateId = useCallback(async (selectedState) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/city/get-cities-by-state-id', { stateId: selectedState });
            if (response.data.result === true) {
                setDistrictData(response.data.message);
                setIsDistrictDisabled(false);
            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    }, []);

    const handleBlocks = (selectedTaluk) => {
        fetchBlocksByTalukId(selectedTaluk);
    };

    const fetchBlocksByTalukId = useCallback(async (selectedTaluk) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/block/get-blocks-by-taluk-id', { talukId: selectedTaluk });
            if (response.data.result === true) {
                setBlockData(response.data.message);
                setIsBlockDisabled(false);
            }
        } catch (error) {
            console.error('Failed to fetch blocks:', error);
        }
    }, []);

    const handleTaluks = (selectedDistrict) => {
        fetchTaluksByDistrictId(selectedDistrict);
    };

    const fetchTaluksByDistrictId = useCallback(async (selectedDistrict) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/taluk/get-taluks-by-district-id', { districtId: selectedDistrict });
            if (response.data.result === true) {
                setTalukData(response.data.message);
                setIsTalukDisabled(false);
            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    }, []);

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <Grid item xs={12} md={4}>
            <Card className='h-full'>
                <CardHeader title='Panchayat' />
                <CardContent>
                    <div className='flex flex-col justify-between mb-4'>
                        <div className='flex flex-col items-start'>
                            <form onSubmit={handleSubmit(handleOnSubmit)} className='w-full'>
                                <Grid item xs={12} className='mb-2'>
                                    <Controller
                                        name='countryId'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: registerData.countryNameReq }}
                                        render={({ field }) => (
                                            <TextFieldStyled
                                                select
                                                fullWidth
                                                id='countryId'
                                                label={<CustomInputLabel htmlFor='countryName' text='Country Name' />}
                                                size="small"
                                                variant='filled'
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                                error={!!errors?.countryId || apiErrors?.countryId}
                                                helperText={errors?.countryId?.message || apiErrors?.countryId}
                                                onChange={(event) => {
                                                    handleStates(event.target.value);
                                                    field.onChange(event);
                                                }}
                                            >
                                                <MenuItem value='' disabled>Select Country</MenuItem>
                                                {countryData?.map((country) => (
                                                    <MenuItem value={country.id} key={country.id}>{country.name}</MenuItem>
                                                ))}
                                            </TextFieldStyled>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} className='mb-2'>
                                    <Controller
                                        name='stateId'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: registerData.stateNameReq }}
                                        render={({ field }) => (
                                            <TextFieldStyled
                                                select
                                                fullWidth
                                                id='stateId'
                                                label={<CustomInputLabel htmlFor='stateName' text='State Name' />}
                                                size="small"
                                                variant='filled'
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                                error={!!errors.stateId || apiErrors?.stateId}
                                                helperText={errors?.stateId?.message || apiErrors?.stateId}
                                                disabled={isStateDisabled}
                                                onChange={(event) => {
                                                    handleDistricts(event.target.value);
                                                    field.onChange(event);
                                                }}
                                            >
                                                <MenuItem value='' disabled>Select State</MenuItem>
                                                {stateData?.map((state) => (
                                                    <MenuItem value={state.id} key={state.id}>{state.name}</MenuItem>
                                                ))}
                                            </TextFieldStyled>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} className='mb-2'>
                                    <Controller
                                        name='districtId'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: registerData.districtNameReq }}
                                        render={({ field }) => (
                                            <TextFieldStyled
                                                select
                                                fullWidth
                                                id='districtId'
                                                label={<CustomInputLabel htmlFor='districtName' text='District Name' />}
                                                size="small"
                                                variant='filled'
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                                error={!!errors.districtId || apiErrors?.districtId}
                                                helperText={errors?.districtId?.message || apiErrors?.districtId}
                                                disabled={isDistrictDisabled}
                                                onChange={(event) => {
                                                    handleTaluks(event.target.value);
                                                    field.onChange(event);
                                                }}
                                            >
                                                <MenuItem value='' disabled>Select District</MenuItem>
                                                {districtData?.map((district) => (
                                                    <MenuItem value={district.id} key={district.id}>{district.name}</MenuItem>
                                                ))}
                                            </TextFieldStyled>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} className='mb-2'>
                                    <Controller
                                        name='talukId'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: registerData.talukNameReq }}
                                        render={({ field }) => (
                                            <TextFieldStyled
                                                select
                                                fullWidth
                                                id='talukId'
                                                label={<CustomInputLabel htmlFor='talukName' text='Taluk Name' />}
                                                size="small"
                                                variant='filled'
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                                error={!!errors.talukId || apiErrors?.talukId}
                                                helperText={errors?.talukId?.message || apiErrors?.talukId}
                                                disabled={isTalukDisabled}
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
                                </Grid>
                                <Grid item xs={12} className='mb-2'>
                                    <Controller
                                        name='blockId'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: registerData.blockNameReq }}
                                        render={({ field }) => (
                                            <TextFieldStyled
                                                select
                                                fullWidth
                                                id='blockId'
                                                label={<CustomInputLabel htmlFor='blockName' text='Block Name' />}
                                                size="small"
                                                variant='filled'
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                                error={!!errors.blockId || apiErrors?.blockId}
                                                helperText={errors?.blockId?.message || apiErrors?.blockId}
                                                disabled={isBlockDisabled}
                                            >
                                                <MenuItem value='' disabled>Select Block</MenuItem>
                                                {blockData?.map((block) => (
                                                    <MenuItem value={block.id} key={block.id}>{block.name}</MenuItem>
                                                ))}
                                            </TextFieldStyled>
                                        )}
                                    />
                                </Grid>
                                <input type="file" className={apiErrors?.uplFile ? "mb-0" : "mb-3"} accept=".xlsx, .xls" onChange={handleFileChange} />
                                <Typography className="text-red-500 mt-2 mb-3">Note: For file import, only the <strong>`lgdCode`</strong> and <strong>`name`</strong> fields are required after selecting the fields mentioned above.</Typography>
                                {apiErrors?.uplFile && <Typography className="text-red-500 mt-2 mb-3">{apiErrors.uplFile}</Typography>}
                                <div className='flex justify-between'>
                                    <Button size="small" variant='contained' type='submit'>{(isButtonLoading) ? <Loader type="btnLoader" /> : "Upload"}</Button>
                                    <Button size="small" variant='contained' style={{ width: '50%' }} startIcon={<i className='bx-download' />} onClick={() => handleExport('panchayats')}> {(isDwnldBtnLoading) ? <Loader type="btnLoader" /> : "Download"}</Button>
                                </div>
                            </form>
                            {apiErrors?.panchayatErr && <Typography className='text-red-500 mt-2'>{apiErrors.panchayatErr}</Typography>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Panchayat;
