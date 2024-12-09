import ApprovedReviewDetail from '@/views/pages/waterbody-details/approved-reviews/ApprovedReviewDetail'
import Grid from '@mui/material/Grid'

const ApprovedReviewDetailViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ApprovedReviewDetail />
            </Grid>
        </Grid>
    )
}

export default ApprovedReviewDetailViewTab
