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
import apiWBMasterClient from '@/utils/apiWBMasterClient';
import CustomInputLabel from '@/components/asterick';

const WaterBodyMasterDialog = ({ open, setOpen, data, id, handleDataUpdate, apiEndPoint, menuName }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState({});
    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();

    useEffect(() => {
        setApiErrors({});
        clearErrors();
        if (data) {
            reset({
                name: data?.name || '',
            });
        }
    }, [data, open, reset]);

    const handleClose = () => {
        setOpen(false)
        // reset()
    };

    const handleOnUpdate = async (data) => {
        if (isLoading) { return };
        setIsLoading(true);
        if (id) data.id = id;
        const { data: { result, message } } = await apiWBMasterClient.post(apiEndPoint, data);
        if (result === true) {
            showToast(true, message);
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
                Edit {menuName}
            </DialogTitle>
            <form onSubmit={handleSubmit(handleOnUpdate)} autoComplete='off'>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            <TextFieldStyled
                                fullWidth
                                size={"small"}
                                label={<CustomInputLabel htmlFor={`${menuName} Name`} text={`${menuName} Name`} />}
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                {...register('name', { required: registerData.nameReq, validate: value => value.trim() !== '' || registerData.nameReq })}
                                error={!!errors?.name || !!apiErrors?.name}
                                helperText={errors?.name?.message || apiErrors?.name}
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

WaterBodyMasterDialog.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handleDataUpdate: PropTypes.any,
    showToast: PropTypes.any,
    apiEndPoint: PropTypes.any,
    menuName: PropTypes.any,
};

export default WaterBodyMasterDialog
