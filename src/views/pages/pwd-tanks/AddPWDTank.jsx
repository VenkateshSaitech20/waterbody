import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useForm } from 'react-hook-form';
import TextFieldStyled from '@core/components/mui/TextField';
import { registerData, responseData } from '@/utils/message';
import Loader from '@/components/loader';
import PropTypes from "prop-types";
import CustomInputLabel from '@/components/asterick';
import { CardContent, Grid } from '@mui/material';
import SubUserPermission from '@/utils/SubUserPermission';
import { showToast } from '@/utils/helper';
import apiWBDClient from '@/utils/apiWBDClient';
const AddPWDTank = props => {
    const { open, handleClose, handlePWDTankAdded } = props;
    const [apiErrors, setApiErrors] = useState({});
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { gwbPermission } = SubUserPermission();
    const handleReset = () => {
        handleClose()
        setApiErrors({});
        reset();
    };
    const handlePWDTankSubmit = async (data) => {
        setApiErrors({});
        setIsButtonLoading(true);
        const response = await apiWBDClient.post('/pwd-tanks', data);
        if (response.data.result === true) {
            showToast(true, response.data.message);
            handlePWDTankAdded();
            setApiErrors({});
            setIsButtonLoading(false);
            handleClose();
            reset();
        } else if (response.data.result === false) {
            if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            } else {
                setApiErrors(response.data.message)
            }
        }
        setIsButtonLoading(false);
    };
    return (
        <Drawer
            open={open}
            anchor='right'
            variant='temporary'
            onClose={handleReset}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
        >
            <div className='flex items-center justify-between p-6'>
                <Typography variant='h5'>Add Country</Typography>
                <IconButton size='small' onClick={handleReset}>
                    <i className='bx-x text-textPrimary text-2xl' />
                </IconButton>
            </div>
            <Divider />
            <div>
                <CardContent>
                    <form autoComplete='off' onSubmit={handleSubmit(handlePWDTankSubmit)}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <TextFieldStyled
                                    fullWidth
                                    variant='filled'
                                    size={"small"}
                                    InputLabelProps={{ shrink: true }}
                                    label={<CustomInputLabel htmlFor='uniqueId' text='Unique Id' />}
                                    placeholder='Eg: 20422P019'
                                    error={!!errors.uniqueId || apiErrors?.uniqueId}
                                    helperText={errors?.uniqueId?.message || apiErrors?.uniqueId}
                                    {...register('uniqueId', { required: registerData.uniqueIdReq, validate: value => value.trim() !== '' || registerData.uniqueIdReq })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldStyled
                                    fullWidth
                                    variant='filled'
                                    size={"small"}
                                    InputLabelProps={{ shrink: true }}
                                    label={<CustomInputLabel htmlFor='ponds' text='Ponds/OO' />}
                                    placeholder='Eg: Oorani'
                                    error={!!errors.pond || apiErrors?.pond}
                                    helperText={errors?.pond?.message || apiErrors?.pond}
                                    {...register('pond', { required: registerData.pondReq, validate: value => value.trim() !== '' || registerData.pondReq })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldStyled
                                    fullWidth
                                    variant='filled'
                                    size={"small"}
                                    InputLabelProps={{ shrink: true }}
                                    label={<CustomInputLabel htmlFor='latitude' text='Latitude' />}
                                    placeholder='Eg: 9.943680'
                                    error={!!errors.latitude || apiErrors?.latitude}
                                    helperText={errors?.latitude?.message || apiErrors?.latitude}
                                    {...register('latitude', { required: registerData.latitudeReq, validate: value => value.trim() !== '' || registerData.latitudeReq })}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
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
                            <Grid item xs={12} className='flex gap-4 flex-wrap'>
                                {(gwbPermission?.editPermission === "Y" || gwbPermission?.writePermission === "Y") && (
                                    <Button variant='contained' type='submit'>
                                        {isButtonLoading ? <Loader type="btnLoader" /> : "Add GWB"}
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </div>
        </Drawer>
    )
}
AddPWDTank.propTypes = {
    open: PropTypes.any,
    handleClose: PropTypes.func,
    handlePWDTankAdded: PropTypes.func,
};
export default AddPWDTank
