import Grid from '@mui/material/Grid';
import Condition from '@/views/pages/waterbody-master/condition';

const ConditionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Condition />
            </Grid>
        </Grid>
    )
}

export default ConditionViewTab