import Grid from '@mui/material/Grid';
import DepthSillLevel from '@/views/pages/waterbody-master/depth-sill-level';

const DepthSillLevelViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <DepthSillLevel />
            </Grid>
        </Grid>
    )
}

export default DepthSillLevelViewTab