import Grid from '@mui/material/Grid';
import FenceCondition from '@/views/pages/waterbody-master/fence-condition';

const FenceConditionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FenceCondition />
            </Grid>
        </Grid>
    )
}

export default FenceConditionViewTab