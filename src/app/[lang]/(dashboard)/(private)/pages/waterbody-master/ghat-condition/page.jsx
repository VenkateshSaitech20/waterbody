import Grid from '@mui/material/Grid';
import GhatCondition from '@/views/pages/waterbody-master/ghat-condition';

const GhatConditionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <GhatCondition />
            </Grid>
        </Grid>
    )
}

export default GhatConditionViewTab