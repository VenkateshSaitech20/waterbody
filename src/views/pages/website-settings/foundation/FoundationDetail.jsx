'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick';
import { useParams, useRouter } from 'next/navigation';;
import { useCallback, useEffect, useState } from 'react';
import Loader from '@/components/loader';
import apiClient from '@/utils/apiClient';
import EditFoundationInfo from '@/components/dialogs/edit-foundation-info';
import { getLocalizedUrl } from '@/utils/i18n';

const FoundationDetail = () => {
    const [faqData, setFaqData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const router = useRouter();
    const { lang: locale } = useParams();
    const getUserProfile = useCallback(async () => {
        setIsLoading(true);
        const response = await apiClient.post('/api/website-settings/foundation/get-by-id', { id });
        if (response.data.result === true) {
            setFaqData(response.data.message);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getUserProfile();
    }, []);

    const buttonProps = (children, color, variant) => ({
        children,
        color,
        variant
    });

    const handleFaqUpdate = (updatedFields) => {
        setFaqData(updatedFields)
    };
    const handleBack = () => {
        const url = getLocalizedUrl(`/pages/website-settings`, locale);
        router.push(url);
    }
    return (
        <Card>
            {isLoading && (<div className='my-4'>
                <Loader size='lg' />
            </div>)}
            {!isLoading && (<CardContent className='flex flex-col gap-6'>
                <div className='flex flex-col gap-6'>
                    <div className='flex items-center justify-center flex-col gap-4'>
                        <div className='flex flex-col items-center gap-4'>
                            {/* <CustomAvatar alt='user-profile' src={faqData.image || defaultImg} variant='rounded' className='w-[100px] h-[30px]' /> */}
                            <Typography variant='h5'>{`${faqData.postedBy || ''}`}</Typography>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <Typography variant='h5'>Details</Typography>
                    <Divider className='mlb-4' /> */}
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center flex-wrap gap-x-1.5'>
                            <Typography variant='h6'>Title:</Typography>
                            <Typography>{faqData.title}</Typography>
                        </div>
                        <div className='flex items-center flex-wrap gap-x-1.5'>
                            <Typography variant='h6'>Description:</Typography>
                            <Typography>{faqData.description}</Typography>
                        </div>

                    </div>
                </div>
                <div className='flex gap-4 justify-center'>
                    <OpenDialogOnElementClick
                        element={Button}
                        elementProps={buttonProps('Edit', 'primary', 'contained')}
                        dialog={EditFoundationInfo}
                        dialogProps={{ data: faqData, id: id, handleFaqUpdate }}
                    />
                    <Button variant='tonal' color='secondary' onClick={handleBack}>
                        Back
                    </Button>
                </div>
            </CardContent>)}
        </Card>
    )
}

export default FoundationDetail
