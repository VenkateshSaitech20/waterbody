'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import DirectionalIcon from '@components/DirectionalIcon';
import Logo from '@components/layout/shared/Logo';
import CustomTextField from '@core/components/mui/TextField';
import { getLocalizedUrl } from '@/utils/i18n';
import AuthIllustrationWrapper from './AuthIllustrationWrapper';
import { registerData } from '@/utils/message';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
  ;
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const [apiError, setApiError] = useState({});

  const { lang: locale } = useParams();
  const handleClickShowPassword = () => setIsPasswordShown(show => !show);
  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show);
  const { register, handleSubmit } = useForm({ defaultValues: {} }); 0
  const router = useRouter();

  const handlePasswordReset = async (data) => {
    const { token } = router.query;
    if (data.newPassword !== data.newConfirmPassword) {
      setApiError(prevErr => ({ ...prevErr, passwordError: registerData.confirmPasswordValMsg }))
      return;
    }
    const postData = {
      newPassword: data.newPassword,
      token
    }
    const response = await axios.post('/api/reset-password', postData);
    if (response.data.result === true) {
      // Make toast
    } else {
      setApiError(response.data);
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href={getLocalizedUrl('/', locale)} className='flex justify-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Reset Password 🔒</Typography>
            <Typography>Your new password must be different from previously used passwords</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(handlePasswordReset)} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              label='New Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              {...register('newPassword', { required: registerData.passwordReq })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'bx-hide' : 'bx-show'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            <CustomTextField
              fullWidth
              label='Confirm Password'
              placeholder='············'
              type={isConfirmPasswordShown ? 'text' : 'password'}
              {...register('newConfirmPassword', { required: registerData.confirmPasswordReq })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isConfirmPasswordShown ? 'bx-hide' : 'bx-show'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!errors.newConfirmPassword || !!apiError.passwordError}
              helperText={errors.newConfirmPassword?.message || apiError?.passwordError}
            />
            <Button fullWidth variant='contained' type='submit'>
              Set New Password
            </Button>
            <Typography className='flex justify-center items-center' color='primary'>
              <Link href={getLocalizedUrl('/pages/auth/login-v1', locale)} className='flex items-center gap-1'>
                <DirectionalIcon ltrIconClass='bx-chevron-left' rtlIconClass='bx-chevron-right' className='text-xl' />
                <span>Back to Login</span>
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default ResetPassword
