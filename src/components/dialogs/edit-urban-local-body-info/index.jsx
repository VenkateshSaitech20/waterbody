'use client'
import { useEffect, useState } from 'react';
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

const UrbanLocalBodyDialog = ({ open, setOpen, data, id, handleDataUpdate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState({});
    const [jurisdictionData, setJurisdictionData] = useState([]);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();

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

    useEffect(() => {
        if (open && id && data) {
            getJurisdictions();
            reset({
                jurisdictionId: data?.jurisdictionId || '',
                name: data?.name || '',
                ward: data?.ward || '',
                wardCode: data?.wardCode || '',
                isActive: data?.isActive || '',
            });
        }
    }, [open, data]);

    const handleClose = () => {
        setOpen(false)
        // reset()
    };

    const handleOnUpdate = async (data) => {
        setIsLoading(true);
        if (id) data.id = id;
        const { data: { result, message } } = await apiClient.post('/api/master-data-settings/urban-local-bodies', data);
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
                Edit Local body
            </DialogTitle>
            <form onSubmit={handleSubmit(handleOnUpdate)}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='jurisdictionId'
                                control={control}
                                defaultValue=''
                                rules={{ required: registerData.jurisdictionNameReq }}
                                render={({ field }) => (
                                    <TextFieldStyled
                                        select
                                        fullWidth
                                        id='jurisdictionId'
                                        label={<CustomInputLabel htmlFor='Jurisdiction' text='Jurisdiction Name' />}
                                        size="small"
                                        variant='filled'
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        error={!!errors.jurisdictionId || apiErrors?.jurisdictionId}
                                        helperText={errors?.jurisdictionId?.message || apiErrors?.jurisdictionId}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='Name' text='Name' />}
                                error={!!errors.name || apiErrors?.name}
                                helperText={errors?.name?.message || apiErrors?.name}
                                {...register('name', { required: registerData.nameReq, validate: value => value.trim() !== '' || registerData.nameReq })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='wardCode' text='Ward Code' />}
                                error={!!errors.wardCode || apiErrors?.wardCode}
                                helperText={errors?.wardCode?.message || apiErrors?.wardCode}
                                {...register('wardCode', { required: registerData.wardCodeReq, validate: value => value.trim() !== '' || registerData.wardCodeReq })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='ward' text='Ward' />}
                                error={!!errors.ward || apiErrors?.ward}
                                helperText={errors?.ward?.message || apiErrors?.ward}
                                {...register('ward', { required: registerData.wardReq, validate: value => value.trim() !== '' || registerData.wardReq })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name='isActive'
                                control={control}
                                rules={{ required: registerData.statusReq }}
                                defaultValue='Y'
                                render={({ field }) => (
                                    <TextFieldStyled
                                        select
                                        fullWidth
                                        id='isActive'
                                        label='Active Status'
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

UrbanLocalBodyDialog.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handleDataUpdate: PropTypes.any,
    showToast: PropTypes.any,
};
export default UrbanLocalBodyDialog
