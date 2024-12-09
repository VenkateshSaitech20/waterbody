'use client'
import Grid from '@mui/material/Grid';
import SubUserPermission from '@/utils/SubUserPermission';
import ApprovedReviewTable from './ApprovedReviewTable';

const Review = () => {
    const { approvedReviewPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ApprovedReviewTable approvedReviewPermission={approvedReviewPermission} />
            </Grid>
        </Grid>
    )
}

export default Review
