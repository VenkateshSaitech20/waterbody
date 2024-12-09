'use client'
import Loader from '@/components/loader';
import { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import { showToast } from '@/utils/helper';
import { Typography, Card, CardHeader, CardContent, Button, Grid, MenuItem } from '@mui/material';
import TextFieldStyled from '@/@core/components/mui/TextField';
import { Controller, useForm } from 'react-hook-form';
import CustomInputLabel from '@/components/asterick';
import { registerData, responseData } from '@/utils/message';

const UrbanLocalBody = () => {
    const [fileInput, setFileInput] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [isDwnldBtnLoading, setIsDwnldBtnLoading] = useState(false);
    const [jurisdictionData, setJurisdictionData] = useState([]);
    const [apiErrors, setApiErrors] = useState({});
    const { handleSubmit, formState: { errors }, control } = useForm();

    const handleFileChange = (e) => {
        setFileInput(e.target.files[0]);
    };

    const handleOnSubmit = async (data) => {
        setApiErrors({});
        setIsButtonLoading(true);
        const formData = new FormData();
        formData.append("file", fileInput);
        formData.append('jurisdictionId', data.jurisdictionId)
        const response = await apiClient.post('/api/bulk-import/import-urban-local-bodies', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.result === true) {
            showToast(true, response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            setApiErrors(response.data.message)
        }
        setIsButtonLoading(false);
    };

    const handleExport = async (fileType) => {
        try {
            setIsDwnldBtnLoading(true);
            const response = await apiClient.post('/api/bulk-import/export-excel', { fileType }, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileType}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setIsDwnldBtnLoading(false);
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

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
        getJurisdictions();
    }, []);

    return (
        <Grid item xs={12} md={4}>
            <Card className='h-full'>
                <CardHeader title='Urban Local Body' />
                <CardContent>
                    <div className='flex flex-col justify-between mb-4'>
                        <div className='flex flex-col items-start'>
                            <form onSubmit={handleSubmit(handleOnSubmit)} className='w-full'>
                                <Grid item xs={12} className='mb-2'>
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
                                <input type="file" className={apiErrors?.uplFile ? "mb-0" : "mb-3"} accept=".xlsx, .xls" onChange={handleFileChange} />
                                <Typography className="text-red-500 mt-2 mb-3">Note: For file import, only the <strong>`name`</strong> and <strong>`ward`</strong> and <strong>`wardCode`</strong> fields are required after selecting the fields mentioned above.</Typography>
                                {apiErrors?.uplFile && <Typography className="text-red-500 mt-2 mb-3">{apiErrors.uplFile}</Typography>}
                                <div className='flex justify-between'>
                                    <Button size="small" variant='contained' type='submit'>{(isButtonLoading) ? <Loader type="btnLoader" /> : "Upload"}</Button>
                                    <Button size="small" variant='contained' style={{ width: '50%' }} startIcon={<i className='bx-download' />} onClick={() => handleExport('urbanlocalbodies')}> {(isDwnldBtnLoading) ? <Loader type="btnLoader" /> : "Download"}</Button>
                                </div>
                            </form>
                            {apiErrors?.talukErr && <Typography className='text-red-500 mt-2'>{apiErrors.talukErr}</Typography>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default UrbanLocalBody;
