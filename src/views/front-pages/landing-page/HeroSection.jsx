import { useState, useEffect } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useColorScheme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import classnames from 'classnames';
import { useImageVariant } from '@core/hooks/useImageVariant';
import styles from './styles.module.css';
import frontCommonStyles from '@views/front-pages/styles.module.css';
import PropTypes from "prop-types";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextFieldStyled from '@/@core/components/mui/TextField';
import { Controller, useForm } from 'react-hook-form';
import { registerData, validations, volunteeringFor } from '@/utils/message';
import { Alert, Grid, MenuItem } from '@mui/material';
import CustomInputLabel from '@/components/asterick';
import Loader from '@/components/loader';
import axios from 'axios';

const HeroSection = ({ mode, data }) => {
    const [transform, setTransform] = useState('');
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({ defaultValues: {} });
    const [apiErrors, setApiErrors] = useState({});
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const defaultDashboardImageLight = '/images/front-pages/landing-page/hero-dashboard-light.png'
    const defaultDashboardImagedark = '/images/front-pages/landing-page/hero-dashboard-dark.png'
    const dashboardImageLight = data?.image1 || defaultDashboardImageLight;
    const dashboardImageDark = data?.image2 || defaultDashboardImagedark;

    const { mode: muiMode } = useColorScheme()
    const _mode = (muiMode === 'system' ? mode : muiMode) || mode
    const dashboardImage = useImageVariant(mode, dashboardImageLight, dashboardImageDark)
    const isAboveLgScreen = useMediaQuery(theme => theme.breakpoints.up('lg'))

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setSuccessMsg('');
        reset();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleMouseMove = event => {
                const rotateX = (window.innerHeight - 2 * event.clientY) / 100
                const rotateY = (window.innerWidth - 2 * event.clientX) / 100
                setTransform(
                    `perspective(1200px) rotateX(${rotateX < -40 ? -20 : rotateX}deg) rotateY(${rotateY}deg) scale3d(1,1,1)`
                )
            }
            window.addEventListener('mousemove', handleMouseMove)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [])

    const handleVolunteerFormSubmit = async (data) => {
        setIsButtonLoading(true);
        setApiErrors('');
        const response = await apiWBDClient.post(`/volunteer/registration`, data);
        if (response?.data?.result === true) {
            if (response?.data?.message) {
                setSuccessMsg(response.data.message);
                setApiErrors('');
                reset();
                setTimeout(() => {
                    setOpen(false);
                }, 3000);
            }
        } else if (response.data.result === false) {
            if (response.data.message) {
                setApiErrors(response.data.message);
            }
        }
        setIsButtonLoading(false);
    }

    return (
        <>
            <section id='home' className='relative overflow-hidden pbs-[80px] -mbs-[80px]' style={{ marginTop: '-100px' }}>
                <div
                    className="hero-bg"
                    style={{
                        borderRadius: '0 0 100px 100px',
                        background: 'linear-gradient(to top right, rgba(0, 96, 217, 0.5), rgba(42, 197, 167, 0.3))',
                        height: '80%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0
                    }}
                ></div>
                <div className={classnames('pbs-[88px] overflow-hidden', frontCommonStyles.layoutSpacing)}>
                    <div className='relative md:max-is-[850px] mbe-5 mli-auto text-center'>
                        <Typography className={styles.heroText}>{data?.title}</Typography>
                        <Typography variant='h6'>
                            {data?.description}
                        </Typography>
                        <div className='relative flex justify-center mbs-6'>
                            <Button
                                size='large'
                                variant='contained'
                                color='primary'
                                className="me-2"
                                onClick={handleClickOpen}
                            >
                                {data?.badgeTitle}
                            </Button>
                            <Button
                                component={Link}
                                size='large'
                                href='#'
                                variant='contained'
                                color='primary'
                            >
                                Download Now
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    className={classnames('relative text-center', frontCommonStyles.layoutSpacing, { 'plb-6': isAboveLgScreen })}
                    style={{ transform: isAboveLgScreen ? transform : 'none', transformStyle: 'preserve-3d' }}
                >
                    <Link href='javascript:0;' className='block relative' style={{ transformStyle: 'preserve-3d' }}>
                        <img
                            src={dashboardImage}
                            alt='dashboard-image'
                            className={`${styles.heroSecDashboard} max-w-full h-auto`}
                        />
                    </Link>
                </div>
            </section>

            {/* Volunteer Registration Form */}
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Volunteer Registration"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={12} lg={12}>
                                <form onSubmit={handleSubmit(handleVolunteerFormSubmit)} className='gap-4'>
                                    <TextFieldStyled
                                        fullWidth
                                        label={<CustomInputLabel htmlFor='name' text='Name' />}
                                        id='name-input'
                                        variant='filled'
                                        placeholder='Enter your full name'
                                        InputLabelProps={{ shrink: true }}
                                        {...register('name', { required: registerData.nameReq, validate: value => value.trim() !== '' || registerData.nameReq })}
                                        error={!!errors.name || !!apiErrors?.name}
                                        helperText={errors.name?.message || apiErrors?.name}
                                        className="mb-3"
                                    />
                                    <TextFieldStyled
                                        fullWidth
                                        label={<CustomInputLabel htmlFor='email' text='Email' />}
                                        id='email-input'
                                        type='email'
                                        variant='filled'
                                        placeholder='Enter your email address'
                                        InputLabelProps={{ shrink: true }}
                                        {...register('email', {
                                            required: registerData.emailReq, pattern: {
                                                value: validations.emailPattern,
                                                message: registerData.emailValMsg,
                                            },
                                        })}
                                        error={!!errors?.email || !!apiErrors?.email}
                                        helperText={errors?.email?.message || apiErrors?.email}
                                        className="mb-3"
                                    />
                                    <TextFieldStyled
                                        fullWidth
                                        label={<CustomInputLabel htmlFor='mobile-no' text='Mobile No' />}
                                        variant='filled'
                                        InputLabelProps={{ shrink: true }}
                                        size={"small"}
                                        placeholder='Enter your mobile number'
                                        {...register('mobile', { required: registerData.mobReq })}
                                        error={!!errors?.mobile || !!apiErrors?.mobile}
                                        helperText={errors?.mobile?.message || apiErrors?.mobile}
                                        className="mb-3"
                                    />
                                    <Controller
                                        name='volunteeringFor'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: registerData.volunteeringForReq }}
                                        render={({ field }) => (
                                            <TextFieldStyled
                                                select
                                                fullWidth
                                                id='volunteeringFor'
                                                label={<CustomInputLabel htmlFor='volunteeringFor' text='Volunteering For' />}
                                                size="small"
                                                variant='filled'
                                                className="mb-3"
                                                InputLabelProps={{ shrink: true }}
                                                {...field}
                                                error={!!errors.volunteeringFor || apiErrors?.volunteeringFor}
                                                helperText={errors?.volunteeringFor?.message || apiErrors?.volunteeringFor}
                                            >
                                                {volunteeringFor?.map((item) => (
                                                    <MenuItem value={item.value} key={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </TextFieldStyled>
                                        )}
                                    />
                                    <TextFieldStyled
                                        fullWidth
                                        variant='filled'
                                        size={"small"}
                                        InputLabelProps={{ shrink: true }}
                                        label={<CustomInputLabel htmlFor='taluk' text='Taluk Name' />}
                                        placeholder='Taluk Name'
                                        error={!!errors.taluk || apiErrors?.taluk}
                                        helperText={errors?.taluk?.message || apiErrors?.taluk}
                                        {...register('taluk', { required: registerData.talukNameReq, validate: value => value.trim() !== '' || registerData.talukNameReq })}
                                        className="mb-3"
                                    />
                                    <TextFieldStyled
                                        fullWidth
                                        variant='filled'
                                        size={"small"}
                                        InputLabelProps={{ shrink: true }}
                                        label={<CustomInputLabel htmlFor='block' text='Block Name' />}
                                        placeholder='Block Name'
                                        error={!!errors.block || apiErrors?.block}
                                        helperText={errors?.block?.message || apiErrors?.block}
                                        {...register('block', { required: registerData.blockNameReq, validate: value => value.trim() !== '' || registerData.blockNameReq })}
                                        className="mb-3"
                                    />
                                    {/* {successMsg && (<Typography variant='h5' sx={{ color: 'green' }}>{successMsg}</Typography>)} */}
                                    {successMsg && (<Alert severity="success" className="mb-3">{successMsg}</Alert>)}
                                    <div className="flex justify-center gap-2">
                                        <Button type="submit" variant='contained'>
                                            {isButtonLoading ? <Loader type="btnLoader" /> : "Submit"}
                                        </Button>
                                        <Button variant='contained' color="secondary" onClick={handleClose}>Cancel</Button>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

HeroSection.propTypes = {
    mode: PropTypes.any,
    data: PropTypes.any,
};

export default HeroSection
