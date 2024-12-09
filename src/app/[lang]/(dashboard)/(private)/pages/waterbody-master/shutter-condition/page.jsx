
import Grid from '@mui/material/Grid';
import ShutterCondition from '@/views/pages/waterbody-master/shutter-condition';

const ShutterConditionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ShutterCondition />
            </Grid>
        </Grid>
    )
}

export default ShutterConditionViewTab