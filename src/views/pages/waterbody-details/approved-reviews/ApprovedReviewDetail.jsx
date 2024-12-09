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
import HydrologicParamaters from '../review/components/HydrologicParameters';
import WaterSpreadAreaDetails from '../review/components/WaterSpreadAreaDetails';
import EmbankmentDetails from '../review/components/EmbankmentDetails';
import InletParameters from '../review/components/InletParameters';
import OutletParameters from '../review/components/OutletParameters';
import GhatsParameters from '../review/components/GhatsParameters';
import RetainingWallParameters from '../review/components/RetainingWallParameters';
import FencingParameters from '../review/components/FencingParameters';
import FunctionalParameters from '../review/components/FunctionalParameters';
import UniquenessParameters from '../review/components/UniquenessParameters';
import LegalParameters from '../review/components/LegalParameters';
import EncroachmentDetails from '../review/components/EncroachmentDetails';
import PresenceOfWUA from '../review/components/PresenceOfWUA';
import RenovationDetails from '../review/components/RenovationDetails';
import FutureActivities from '../review/components/FutureActivities';
import ReviewImages from '../review/components/ReviewImages';
import ReviewMap from '../review/components/ReviewMap';

const ApprovedReviewDetail = () => {
    const [reviewData, setReviewData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const router = useRouter();
    const { lang: locale } = useParams();

    const getApprovedReviewDetail = useCallback(async () => {
        setIsLoading(true);
        const response = await apiWBDClient.get(`water-body-details/review/${id}`);
        if (response.data.result === true) {
            setReviewData(response.data.message);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getApprovedReviewDetail();
    }, []);

    const handleBack = () => {
        const url = getLocalizedUrl(`/pages/waterbody-details/approved-reviews/`, locale)
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

export default ApprovedReviewDetail
