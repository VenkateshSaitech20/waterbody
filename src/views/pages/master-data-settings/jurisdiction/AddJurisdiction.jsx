import React, { useState } from 'react';
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
import apiClient from '@/utils/apiClient';
import CustomInputLabel from '@/components/asterick';
import { CardContent, Grid } from '@mui/material';
import SubUserPermission from '@/utils/SubUserPermission';
import { showToast } from '@/utils/helper';

const AddJurisdiction = props => {
    const { open, handleClose, handleDistrictAdded } = props;
    const [apiErrors, setApiErrors] = useState({});
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const { masterSettingsPermission } = SubUserPermission();

    const handleReset = () => {
        handleClose()
        setApiErrors({});
        reset();
    };

    const handleOnSubmit = async (data) => {
        setApiErrors({});
        setIsButtonLoading(true);
        const response = await apiClient.post('/api/master-data-settings/jurisdiction', data);
        if (response.data.result === true) {
            showToast(true, response.data.message);
            handleDistrictAdded();
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
                <Typography variant='h5'>Add Jurisdiction</Typography>
                <IconButton size='small' onClick={handleReset}>
                    <i className='bx-x text-textPrimary text-2xl' />
                </IconButton>
            </div>
            <Divider />
            <div>
                <CardContent>
                    <form autoComplete='off' onSubmit={handleSubmit(handleOnSubmit)}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <TextFieldStyled
                                    fullWidth
                                    variant='filled'
                                    size={"small"}
                                    InputLabelProps={{ shrink: true }}
                                    label={<CustomInputLabel htmlFor='name' text='Jurisdiction Name' />}
                                    placeholder='Jurisdiction Name'
                                    error={!!errors.name || apiErrors?.name}
                                    helperText={errors?.name?.message || apiErrors?.name}
                                    {...register('name', { required: registerData.nameReq, validate: value => value.trim() !== '' || registerData.nameReq })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name='isActive'
                                    control={control}
                                    defaultValue='Y'
                                    render={({ field }) => (
                                        <TextFieldStyled
                                            select
                                            fullWidth
                                            id='isActive'
                                            label={<CustomInputLabel htmlFor='activeStatus' text='Active Status' />}
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
                            <Grid item xs={12} className='flex gap-4 flex-wrap'>
                                {(masterSettingsPermission?.editPermission === "Y" || masterSettingsPermission?.writePermission === "Y") && (
                                    <Button variant='contained' type='submit'>
                                        {isButtonLoading ? <Loader type="btnLoader" /> : "Add Jurisdiction"}
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

AddJurisdiction.propTypes = {
    open: PropTypes.any,
    handleClose: PropTypes.func,
    handleDistrictAdded: PropTypes.func,
};

export default React.memo(AddJurisdiction)
