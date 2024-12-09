'use client'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogCloseButton from '../DialogCloseButton';
import TextFieldStyled from '@core/components/mui/TextField';
import { registerData, responseData } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { showToast } from '@/utils/helper';
import { signOut } from 'next-auth/react';
import PropTypes from "prop-types";
import Loader from '@/components/loader';
import CustomInputLabel from '@/components/asterick';
import apiWBDClient from '@/utils/apiWBDClient';

const GWBDialog = ({ open, setOpen, data, id, handleGWBUpdate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue, reset, clearErrors } = useForm();
    useEffect(() => {
        if (open && id && data) {
            Object.keys(data).forEach((key) => {
                setValue(key, data[key]);
            });
        }
    }, [open, data]);
    useEffect(() => {
        clearErrors();
    }, [open, reset]);
    const handleClose = () => {
        setOpen(false)
        // reset()
    };
    const handleUpdateCountry = async (data) => {
        if (isLoading) { return };
        setIsLoading(true);
        if (id) data.id = id;
        const { data: { result, message } } = await apiWBDClient.post('/water-body-details/gwb', data);
        if (result === true) {
            showToast(true, responseData.dataUpdated);
            handleGWBUpdate(message);
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
                Edit GWB
            </DialogTitle>
            <form onSubmit={handleSubmit(handleUpdateCountry)}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                size={"small"}
                                label={<CustomInputLabel htmlFor='uniqueId' text='Unique Id' />}
                                placeholder='Eg: 20422P019'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                {...register('uniqueId', { required: registerData.uniqueIdReq, validate: value => value.trim() !== '' || registerData.uniqueIdReq })}
                                error={!!errors?.uniqueId || !!apiErrors?.uniqueId}
                                helperText={errors?.uniqueId?.message || apiErrors?.uniqueId}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='ponds' text='Ponds/OO' />}
                                placeholder='Eg: Oorani'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                size={"small"}
                                {...register('pond', { required: registerData.pondReq, validate: value => value.trim() !== '' || registerData.pondReq })}
                                error={Boolean(errors?.pond) || !!apiErrors?.pond}
                                helperText={errors?.pond?.message || apiErrors?.pond}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='latitude' text='latitude' />}
                                placeholder='Eg: 9.943680'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                size={"small"}
                                {...register('latitude', { required: registerData.latitudeReq, validate: value => value.trim() !== '' || registerData.latitudeReq })}
                                error={Boolean(errors?.latitude) || !!apiErrors?.latitude}
                                helperText={errors?.latitude?.message || apiErrors?.latitude}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='longitude' text='Longitude' />}
                                placeholder='Eg: 78.278251'
                                error={!!errors.longitude || apiErrors?.longitude}
                                helperText={errors?.longitude?.message || apiErrors?.longitude}
                                {...register('longitude', { required: registerData.longitudeReq, validate: value => value.trim() !== '' || registerData.longitudeReq })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='taluk' text='Taluk' />}
                                placeholder='Eg: MELUR'
                                error={!!errors.taluk || apiErrors?.taluk}
                                helperText={errors?.taluk?.message || apiErrors?.taluk}
                                {...register('taluk', { required: registerData.talukReq, validate: value => value.trim() !== '' || registerData.talukReq })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='village' text='Village' />}
                                placeholder='Eg: Amoor'
                                error={!!errors.village || apiErrors?.village}
                                helperText={errors?.village?.message || apiErrors?.village}
                                {...register('village', { required: registerData.villageReq, validate: value => value.trim() !== '' || registerData.villageReq })}
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

GWBDialog.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handleGWBUpdate: PropTypes.any,
    showToast: PropTypes.any,
};
export default GWBDialog
