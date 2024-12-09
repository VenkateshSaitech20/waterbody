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

const PWDTanks = ({ open, setOpen, data, id, handlePWDTankUpdate }) => {
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
    const handleUpdatePWDTank = async (data) => {
        if (isLoading) { return };
        setIsLoading(true);
        if (id) data.id = id;
        Object.keys(data).forEach(key => {
            data[key] = data[key] === null || data[key] === undefined ? "" : String(data[key]);
        });
        const { data: { result, message } } = await apiWBDClient.post('/pwd-tanks', data);
        if (result === true) {
            showToast(true, responseData.dataUpdated);
            handlePWDTankUpdate(message);
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
                Edit PWD Tank
            </DialogTitle>
            <form onSubmit={handleSubmit(handleUpdatePWDTank)}>
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
                                placeholder='Eg: Thanichiyamkulam'
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
                                label={<CustomInputLabel htmlFor='block' text='block' />}
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
                                label={<CustomInputLabel htmlFor='taluk' text='Taluk' />}
                                placeholder='Eg: Usilampatti'
                                error={!!errors.taluk || apiErrors?.taluk}
                                helperText={errors?.taluk?.message || apiErrors?.taluk}
                                {...register('taluk', { required: `Taluk ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Taluk ${registerData.defaultReq}` })}
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
                                label={<CustomInputLabel htmlFor='subBasin' text='Sub Basin' />}
                                placeholder='Eg: Uppar'
                                error={!!errors.subBasin || apiErrors?.subBasin}
                                helperText={errors?.subBasin?.message || apiErrors?.subBasin}
                                {...register('subBasin', { required: `Sub Basin ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Sub Basin ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='subBasin' text='Basin' />}
                                placeholder='Eg: Vaigai'
                                error={!!errors.basin || apiErrors?.basin}
                                helperText={errors?.basin?.message || apiErrors?.basin}
                                {...register('basin', { required: `Basin ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Basin ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='section' text='Section' />}
                                placeholder='Eg: Usilampatti'
                                error={!!errors.section || apiErrors?.section}
                                helperText={errors?.section?.message || apiErrors?.basin}
                                {...register('section', { required: `Section ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Section ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='subDn' text='Sub DN' />}
                                placeholder='Eg: Usilampatti'
                                error={!!errors.subDn || apiErrors?.subDn}
                                helperText={errors?.subDn?.message || apiErrors?.subDn}
                                {...register('subDn', { required: `Sub DN ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Sub DN ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='division' text='Division' />}
                                placeholder='Eg: Periyar Main Canal Division, Melur'
                                error={!!errors.division || apiErrors?.division}
                                helperText={errors?.division?.message || apiErrors?.division}
                                {...register('division', { required: `Division ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Division ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Circle"
                                placeholder='Eg: '
                                error={!!errors.circle || apiErrors?.circle}
                                helperText={errors?.circle?.message || apiErrors?.circle}
                                {...register('circle')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='region' text='Region' />}
                                placeholder='Eg: Madurai'
                                error={!!errors.region || apiErrors?.region}
                                helperText={errors?.region?.message || apiErrors?.region}
                                {...register('region', { required: `Region ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Region ${registerData.defaultReq}` })}
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
                                label={<CustomInputLabel htmlFor='tankType' text='Capacity' />}
                                placeholder='Eg: 0.050'
                                error={!!errors.capacity || apiErrors?.capacity}
                                helperText={errors?.capacity?.message || apiErrors?.capacity}
                                {...register('capacity', { required: `Capacity ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Capacity ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="FTL (M)"
                                placeholder='Eg: 100.00'
                                error={!!errors.ftl || apiErrors?.ftl}
                                helperText={errors?.ftl?.message || apiErrors?.ftl}
                                {...register('ftl')}
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
                                label="TBL (M)"
                                placeholder='Eg: 101.57'
                                error={!!errors.tbl || apiErrors?.tbl}
                                helperText={errors?.tbl?.message || apiErrors?.tbl}
                                {...register('tbl')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Storage Depth (M)"
                                placeholder='Eg: 1.000'
                                error={!!errors.storageDepth || apiErrors?.storageDepth}
                                helperText={errors?.storageDepth?.message || apiErrors?.storageDepth}
                                {...register('storageDepth', { required: `Storage Depth ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Storage Depth ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='ayacut' text='Ayacut' />}
                                placeholder='Eg: 56.990'
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
                                label="Catchment Area"
                                placeholder='Eg: 0.690'
                                error={!!errors.catchmentArea || apiErrors?.catchmentArea}
                                helperText={errors?.catchmentArea?.message || apiErrors?.catchmentArea}
                                {...register('catchmentArea', { required: `Catchment Area ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Catchment Area ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Wat Spr Ar"
                                placeholder='Eg: 2.137'
                                error={!!errors.watSpread || apiErrors?.watSpread}
                                helperText={errors?.watSpread?.message || apiErrors?.watSpread}
                                {...register('watSpread', { required: `Wat Spr Ar ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Wat Spr Ar ${registerData.defaultReq}` })}
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
                                error={!!errors.noOfWeirs || apiErrors?.noOfWeirs}
                                helperText={errors?.noOfWeirs?.message || apiErrors?.noOfWeirs}
                                {...register('noOfWeirs', { required: `No OF Weirs ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `No OF Weirs ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Weir Length"
                                placeholder='Eg: 52.400'
                                error={!!errors.weirLength || apiErrors?.weirLength}
                                helperText={errors?.weirLength?.message || apiErrors?.weirLength}
                                {...register('weirLength', { required: `Weir Length ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Weir Length ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="No Of Sluices"
                                placeholder='Eg: 2'
                                error={!!errors.noOfSluices || apiErrors?.noOfSluices}
                                helperText={errors?.noOfSluices?.message || apiErrors?.noOfSluices}
                                {...register('noOfSluices', { required: `No Of Sluices ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `No Of Sluices ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label="Lowest Sill"
                                placeholder='Eg: 159.05'
                                error={!!errors.lowestSill || apiErrors?.lowestSill}
                                helperText={errors?.lowestSill?.message || apiErrors?.lowestSill}
                                {...register('lowestSill', { required: `Lowest Sill ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Lowest Sill ${registerData.defaultReq}` })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldStyled
                                fullWidth
                                variant='filled'
                                size={"small"}
                                InputLabelProps={{ shrink: true }}
                                label={<CustomInputLabel htmlFor='bundLength' text='Bund Length' />}
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
                                label={<CustomInputLabel htmlFor='discharge' text='Discharge' />}
                                placeholder='Eg: 949.638'
                                error={!!errors.discharge || apiErrors?.discharge}
                                helperText={errors?.discharge?.message || apiErrors?.discharge}
                                {...register('discharge', { required: `Discharge ${registerData.defaultReq}`, validate: value => value.trim() !== '' || `Discharge ${registerData.defaultReq}` })}
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

PWDTanks.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    data: PropTypes.any,
    id: PropTypes.any,
    handlePWDTankUpdate: PropTypes.any,
    showToast: PropTypes.any,
};
export default PWDTanks
