'use client'
import Grid from '@mui/material/Grid';
import ReviewTable from './ReviewTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Review = () => {
    const { reviewPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ReviewTable reviewPermission={reviewPermission} />
            </Grid>
        </Grid>
    )
}

export default Review
