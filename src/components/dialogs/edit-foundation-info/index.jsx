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
import { responseData } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { showToast } from '@/utils/helper';
import { signOut } from 'next-auth/react';
import PropTypes from "prop-types";
import Loader from '@/components/loader';
import apiClient from '@/utils/apiClient';
import CustomInputLabel from '@/components/asterick';

const EditFoundationInfo = ({ open, setOpen, data, id, handleFaqUpdate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (open && data) {
            reset({
                title: data?.title || '',
                description: data?.description || '',

            });

        }
    }, [data, open, reset]);
    const handleClose = () => {
        setOpen(false)

    };
    const handleUpdateFaqData = async (data) => {
        setIsLoading(true);
        if (id) {
            data = { ...data, id }
        }
        const { data: { result, message } } = await apiClient.post('/api/website-settings/foundation', data
        );
        if (result === true) {
            handleFaqUpdate(data);
            setOpen(false);
            setApiErrors({});
            showToast(true, responseData.dataUpdated);
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
                Edit Foundation Information
            </DialogTitle>

            <form onSubmit={handleSubmit(handleUpdateFaqData)}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={12}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='title' text='Title' />}
                                placeholder='Title'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                {...register('title')}
                                error={!!errors?.title || !!apiErrors?.title}
                                helperText={errors?.title?.message || apiErrors?.title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='description' text='Description' />}
                                placeholder='Description'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                {...register('description')}
                                error={!!errors?.description || !!apiErrors?.description}
                                helperText={errors?.description?.message || apiErrors?.description}
                                multiline={true}
                                rows={5}
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

EditFoundationInfo.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handleFaqUpdate: PropTypes.any,
    showToast: PropTypes.any,
};
export default EditFoundationInfo
