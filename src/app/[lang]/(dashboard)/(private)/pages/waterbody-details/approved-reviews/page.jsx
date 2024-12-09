import Grid from '@mui/material/Grid';
import ApprovedReview from '@/views/pages/waterbody-details/approved-reviews';

const ReviewViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ApprovedReview />
            </Grid>
        </Grid>
    )
}

export default ReviewViewTab


