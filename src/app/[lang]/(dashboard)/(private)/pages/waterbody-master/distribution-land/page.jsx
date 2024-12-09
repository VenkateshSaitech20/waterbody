import Grid from '@mui/material/Grid';
import DistributionLand from '@/views/pages/waterbody-master/distribution-land';

const DistributionLandViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <DistributionLand />
            </Grid>
        </Grid>
    )
}

export default DistributionLandViewTab