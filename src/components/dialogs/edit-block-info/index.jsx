'use client'
import { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import DialogCloseButton from '../DialogCloseButton';
import TextFieldStyled from '@core/components/mui/TextField';
import { registerData, responseData } from '@/utils/message';
import { Controller, useForm } from 'react-hook-form';
import { showToast } from '@/utils/helper';
import { signOut } from 'next-auth/react';
import PropTypes from "prop-types";
import Loader from '@/components/loader';
import apiClient from '@/utils/apiClient';
import CustomInputLabel from '@/components/asterick';

const BlockDialog = ({ open, setOpen, data, id, handleDataUpdate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState({});
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [talukData, setTalukData] = useState([]);
    const [isStateDisabled, setIsStateDisabled] = useState(true);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
    const [isTalukDisabled, setIsTalukDisabled] = useState(true);
    const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm();

    const getCountry = async () => {
        setIsLoading(true);
        const response = await apiClient.get('/api/master-data-settings/country');
        if (response.data.result === true) {
            setCountryData(response.data.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setApiErrors({});
        if (data) {
            getCountry();
            fetchStatesByCountryId(data?.countryId);
            fetchDistrictsByStateId(data?.stateId);
            fetchTaluksByDistrictId(data?.districtId);
            reset({
                name: data?.name || '',
                countryId: data?.countryId || '',
                stateId: data?.stateId || '',
                districtId: data?.districtId || '',
                talukId: data?.talukId || '',
                lgdCode: data?.lgdCode || '',
                isActive: data?.isActive || '',
            });
        }
    }, [data, open, reset]);

    const handleStates = (selectedCountryId) => {
        setValue("stateId", null);
        setDistrictData([]);
        setIsDistrictDisabled(false);
        fetchStatesByCountryId(selectedCountryId);
    };

    const fetchStatesByCountryId = async (selectedCountry) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/state/get-by-country-id', { countryId: selectedCountry });
            if (response.data.result === true) {
                if (response.data.message.length > 0) {
                    setStateData(response.data.message);
                    setIsStateDisabled(false);
                } else {
                    setStateData([]);
                    setIsStateDisabled(false);
                }

            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    };

    const handleCities = (selectedStateId) => {
        setValue("districtId", null);
        fetchDistrictsByStateId(selectedStateId);
    };

    const fetchDistrictsByStateId = async (selectedState) => {
        try {
            const response = await apiClient.post('/api/master-data-settings/city/get-cities-by-state-id', { stateId: selectedState });
            if (response.data.result === true) {
                if (response.data.message.length > 0) {
                    setDistrictData(response.data.message);
                    setIsDistrictDisabled(false);
                } else {
                    setDistrictData([]);
                    setIsDistrictDisabled(false);
                }
            }
        } catch (error) {
            console.error('Failed to fetch states:', error);
        }
    };

    const handleTaluks = (selectedDistrict) => {
        setValue("talukId", null);
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnSubmit = async (data) => {
        setIsLoading(true);
        if (id) data.id = id;
        const { data: { result, message } } = await apiClient.post('/api/master-data-settings/block', data);
        if (result === true) {
            showToast(true, responseData.dataUpdated);
            handleDataUpdate(message);
            setOpen(false);
            setApiErrors({});
        } else if (result === false) {
            if (message?.roleError?.name === responseData.tokenExpired || message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            } else {
                setApiErrors(message);
            }
        }
        setIsLoading(false);
    };

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            maxWidth='md'
            scroll='body'
            sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
        >
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
                <i className='bx-x' />
            </DialogCloseButton>
            <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
                Edit Block
            </DialogTitle>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
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
                                        error={!!errors.countryId || apiErrors?.countryId}
                                        helperText={errors?.countryId?.message || apiErrors?.countryId}
                                        onChange={(event) => {
                                            handleStates(event.target.value);
                                            field.onChange(event);
                                        }}
                                    >
                                        <MenuItem value='' disabled>
                                            Select Country
                                        </MenuItem>
                                        {countryData?.map((country) => (
                                            <MenuItem value={country.id} key={country.id}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </TextFieldStyled>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                            handleCities(event.target.value);
                                            field.onChange(event);
                                        }}
                                    >
                                        <MenuItem value='' disabled>
                                            Select State
                                        </MenuItem>
                                        {stateData?.map((state) => (
                                            <MenuItem value={state.id} key={state.id}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </TextFieldStyled>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                        <MenuItem value='' disabled>
                                            Select District
                                        </MenuItem>
                                        {districtData?.map((district) => (
                                            <MenuItem value={district.id} key={district.id}>
                                                {district.name}
                                            </MenuItem>
                                        ))}
                                    </TextFieldStyled>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='blockName' text='Block Name' />}
                                size="small"
                                placeholder='Eg: Vadipatti'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                {...register('name', { required: registerData.nameReq })}
                                error={!!errors?.name || !!apiErrors?.name}
                                helperText={errors?.name?.message || apiErrors?.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='lgdCode' text='LGD Code' />}
                                size="small"
                                placeholder='Eg: 25'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                {...register('lgdCode', { required: registerData.lgdCodeNameReq })}
                                error={!!errors?.lgdCode || !!apiErrors?.lgdCode}
                                helperText={errors?.lgdCode?.message || apiErrors?.lgdCode}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='isActive'
                                control={control}
                                defaultValue='Y'
                                render={({ field }) => (
                                    <TextFieldStyled
                                        select
                                        fullWidth
                                        id='isActive'
                                        label={<CustomInputLabel htmlFor='activStatus' text='Active Status' />}
                                        size="small"
                                        variant='filled'
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        error={!!apiErrors?.isActive}
                                        helperText={apiErrors?.isActive}
                                    >
                                        <MenuItem value='' disabled>
                                            Select Active Status
                                        </MenuItem>
                                        <MenuItem value='Y'>Yes</MenuItem>
                                        <MenuItem value='N'>No</MenuItem>
                                    </TextFieldStyled>
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
                    <Button variant='contained' type='submit'>
                        {isLoading ? <Loader type="btnLoader" /> : 'Submit'}
                    </Button>
                    <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

BlockDialog.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handleDataUpdate: PropTypes.any,
    showToast: PropTypes.any,
};

export default BlockDialog
