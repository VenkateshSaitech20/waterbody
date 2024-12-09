'use client'
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextFieldStyled from '@core/components/mui/TextField';
import { registerData, responseData } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { showToast } from '@/utils/helper';
import { signOut } from 'next-auth/react';
import PropTypes from "prop-types";
import Loader from '@/components/loader';
import CustomInputLabel from '@/components/asterick';
import apiWBDClient from '@/utils/apiWBDClient';
import DialogCloseButton from '../DialogCloseButton';

const TankWB = ({ open, setOpen, data, id, handleGWBUpdate }) => {
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
    const handleUpdateTankWB = async (data) => {
        if (isLoading) { return };
        setIsLoading(true);
        if (id) data.id = id;
        Object.keys(data).forEach(key => {
            data[key] = data[key] === null || data[key] === undefined ? "" : String(data[key]);
        });
        const { data: { result, message } } = await apiWBDClient.post('/tank-water-bodies', data);
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
                Edit Tank WB
            </DialogTitle>
            <form onSubmit={handleSubmit(handleUpdateTankWB)}>
                <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                size={"small"}
                                label={<CustomInputLabel htmlFor='uniqueId' text='Unique Id' />}
                                placeholder='Eg: 205145T384'
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
                                label={<CustomInputLabel htmlFor='tankName' text='Tank Name' />}
                                placeholder='Eg: Pudukottai'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                size={"small"}
                                {...register('tankName', { required: `Tank Name ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Tank Name ${registerData.defaultReq}` })}
                                error={Boolean(errors?.tankName) || !!apiErrors?.tankName}
                                helperText={errors?.tankName?.message || apiErrors?.tankName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                label={<CustomInputLabel htmlFor='district' text='District' />}
                                placeholder='Eg: Madurai'
                                InputLabelProps={{ shrink: true }}
                                variant='filled'
                                size={"small"}
                                {...register('district', { required: `District ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `District ${registerData.defaultReq}` })}
                                error={Boolean(errors?.district) || !!apiErrors?.district}
                                helperText={errors?.district?.message || apiErrors?.district}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='block' text='Block' />}
                                placeholder='Eg: USILAMPATTI'
                                error={!!errors.block || apiErrors?.block}
                                helperText={errors?.block?.message || apiErrors?.block}
                                {...register('block', { required: `Block ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Block ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='panchayat' text='Panchayat' />}
                                placeholder='Eg: Manappacheri'
                                error={!!errors.panchayat || apiErrors?.panchayat}
                                helperText={errors?.panchayat?.message || apiErrors?.panchayat}
                                {...register('panchayat', { required: `Panchayat ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Panchayat ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='village' text='Village' />}
                                placeholder='Eg: V.pudur'
                                error={!!errors.village || apiErrors?.village}
                                helperText={errors?.village?.message || apiErrors?.village}
                                {...register('village', { required: `Village ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Village ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='tankType' text='Tank Type' />}
                                placeholder='Eg: Non-System tank'
                                error={!!errors.tankType || apiErrors?.tankType}
                                helperText={errors?.tankType?.message || apiErrors?.tankType}
                                {...register('tankType', { required: `Tank Type ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Tank Type ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='ayacut' text='Ayacut (HA)' />}
                                placeholder='Eg: 0.10'
                                error={!!errors.ayacut || apiErrors?.ayacut}
                                helperText={errors?.ayacut?.message || apiErrors?.ayacut}
                                {...register('ayacut', { required: `Ayacut ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Ayacut ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Wat Spr Ar"
                                placeholder='Eg: 10.500'
                                error={!!errors.watSprAr || apiErrors?.watSprAr}
                                helperText={errors?.watSprAr?.message || apiErrors?.watSprAr}
                                {...register('watSprAr')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='capMcm' text='Cap MCM' />}
                                placeholder='Eg: 0.0113'
                                error={!!errors.capMcm || apiErrors?.capMcm}
                                helperText={errors?.capMcm?.message || apiErrors?.capMcm}
                                {...register('capMcm', { required: `Cap MCM ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Cap MCM ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="No of Sluices"
                                placeholder='Eg: Thanichiyam'
                                error={!!errors.noOfSluices || apiErrors?.noOfSluices}
                                helperText={errors?.noOfSluices?.message || apiErrors?.noOfSluices}
                                {...register('noOfSluices')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Sluices Type"
                                placeholder='Eg: '
                                error={!!errors.sluicesType || apiErrors?.sluicesType}
                                helperText={errors?.sluicesType?.message || apiErrors?.sluicesType}
                                {...register('sluicesType')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='bundLength' text='Bund Length (M)' />}
                                placeholder='Eg: 295.00'
                                error={!!errors.bundLength || apiErrors?.bundLength}
                                helperText={errors?.bundLength?.message || apiErrors?.bundLength}
                                {...register('bundLength', { required: `Bund Length ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Bund Length ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='tbl' text='TBL (M)' />}
                                placeholder='Eg: 101.57'
                                error={!!errors.tbl || apiErrors?.tbl}
                                helperText={errors?.tbl?.message || apiErrors?.tbl}
                                {...register('tbl', { required: `TBL ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `TBL ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="MWL (M)"
                                placeholder='Eg: '
                                error={!!errors.mwl || apiErrors?.mwl}
                                helperText={errors?.mwl?.message || apiErrors?.mwl}
                                {...register('mwl')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='ftl' text='FTL (M)' />}
                                placeholder='Eg: 100.00'
                                error={!!errors.ftl || apiErrors?.ftl}
                                helperText={errors?.ftl?.message || apiErrors?.ftl}
                                {...register('ftl', { required: `FTL ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `FTL ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Storage Depth (M)"
                                placeholder='Eg: '
                                error={!!errors.stoDepth || apiErrors?.stoDepth}
                                helperText={errors?.stoDepth?.message || apiErrors?.stoDepth}
                                {...register('stoDepth')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Catchment"
                                placeholder='Eg: '
                                error={!!errors.catchment || apiErrors?.catchment}
                                helperText={errors?.catchment?.message || apiErrors?.catchment}
                                {...register('catchment')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="No OF Weirs"
                                placeholder='Eg: 1'
                                error={!!errors.noOFWeirs || apiErrors?.noOFWeirs}
                                helperText={errors?.noOFWeirs?.message || apiErrors?.noOFWeirs}
                                {...register('noOFWeirs')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Weir Length (M)"
                                placeholder='Eg: 52.400'
                                error={!!errors.weirLength || apiErrors?.weirLength}
                                helperText={errors?.weirLength?.message || apiErrors?.weirLength}
                                {...register('weirLength')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Lowest Sill (M)"
                                placeholder='Eg: 159.05'
                                error={!!errors.lowSill || apiErrors?.lowSill}
                                helperText={errors?.lowestSill?.message || apiErrors?.lowSill}
                                {...register('lowSill')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Dis Cusecs"
                                placeholder='Eg: '
                                error={!!errors.disCusecs || apiErrors?.disCusecs}
                                helperText={errors?.disCusecs?.message || apiErrors?.disCusecs}
                                {...register('disCusecs')}
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

TankWB.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handleGWBUpdate: PropTypes.any,
    showToast: PropTypes.any,
};
export default TankWB
