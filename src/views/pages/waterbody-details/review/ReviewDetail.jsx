'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Loader from '@/components/loader';
import { getLocalizedUrl } from '@/utils/i18n';
import apiWBDClient from '@/utils/apiWBDClient';
import HydrologicParamaters from './components/HydrologicParameters';
import WaterSpreadAreaDetails from './components/WaterSpreadAreaDetails';
import EmbankmentDetails from './components/EmbankmentDetails';
import InletParameters from './components/InletParameters';
import OutletParameters from './components/OutletParameters';
import GhatsParameters from './components/GhatsParameters';
import RetainingWallParameters from './components/RetainingWallParameters';
import FencingParameters from './components/FencingParameters';
import FunctionalParameters from './components/FunctionalParameters';
import UniquenessParameters from './components/UniquenessParameters';
import LegalParameters from './components/LegalParameters';
import EncroachmentDetails from './components/EncroachmentDetails';
import PresenceOfWUA from './components/PresenceOfWUA';
import RenovationDetails from './components/RenovationDetails';
import FutureActivities from './components/FutureActivities';
import ReviewImages from './components/ReviewImages';
import ReviewMap from './components/ReviewMap';

const ReviewDetail = () => {
    const [reviewData, setReviewData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const router = useRouter();
    const { lang: locale } = useParams();

    const getReviewDetail = useCallback(async () => {
        setIsLoading(true);
        const response = await apiWBDClient.get(`water-body-details/review/${id}`);
        if (response.data.result === true) {
            setReviewData(response.data.message);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getReviewDetail();
    }, []);

    const handleBack = () => {
        const url = getLocalizedUrl(`/pages/waterbody-details/review/`, locale)
        router.push(url);
    }

    return (
        <>
            {isLoading && (<div className='my-4'>
                <Loader size='lg' />
            </div>)}
            {!isLoading && (
                <>
                    <Card className="mb-4">
                        <CardContent className='flex flex-col gap-6'>
                            <Typography variant='h5'>Waterbody Details</Typography>
                        </CardContent>
                    </Card>

                    <HydrologicParamaters data={reviewData?.waterParams?.hydrologicParamaters} />
                    <WaterSpreadAreaDetails data={reviewData?.waterParams?.waterSpreadAreaDetails} />
                    <EmbankmentDetails data={reviewData?.waterParams?.embankmentDetails} />
                    <InletParameters data={reviewData?.waterParams?.inletParameters} />
                    <OutletParameters data={reviewData?.waterParams?.outletParameters} />
                    <GhatsParameters data={reviewData?.waterParams?.ghatsParameters} />
                    <RetainingWallParameters data={reviewData?.waterParams?.retainingWallParameters} />
                    <FencingParameters data={reviewData?.waterParams?.fencingParameters} />
                    <FunctionalParameters data={reviewData?.waterParams?.functionalParameters} />
                    <UniquenessParameters data={reviewData?.waterParams?.uniquenessParameters} />
                    <LegalParameters data={reviewData?.waterParams?.legalParameters} />
                    <EncroachmentDetails data={reviewData?.waterParams?.encroachmentDetails} />
                    <PresenceOfWUA data={reviewData?.waterParams?.presenceOfWUA} />
                    <RenovationDetails data={reviewData?.waterParams?.renovationDetails} />
                    <FutureActivities data={reviewData?.waterParams?.futureActivities} />
                    <ReviewImages data={reviewData?.images} />
                    <ReviewMap gpsCordinates={reviewData?.gpsCordinates} />

                    <Card>
                        <CardContent className='flex flex-col gap-6'>
                            <div className='flex gap-4 justify-center'>
                                <Button variant='tonal' color='secondary' onClick={handleBack}>
                                    Back
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    )
}

export default ReviewDetail
