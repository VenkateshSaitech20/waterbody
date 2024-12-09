import Grid from '@mui/material/Grid';
import Review from '@/views/pages/waterbody-details/review';

const ReviewViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Review />
            </Grid>
        </Grid>
    )
}

export default ReviewViewTab


