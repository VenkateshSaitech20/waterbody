import ReviewDetail from '@/views/pages/waterbody-details/review/ReviewDetail'
import Grid from '@mui/material/Grid'

const ReviewDetailViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ReviewDetail />
            </Grid>
        </Grid>
    )
}

export default ReviewDetailViewTab
