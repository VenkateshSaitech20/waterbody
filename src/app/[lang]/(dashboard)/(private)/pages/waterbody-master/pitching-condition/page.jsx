
import Grid from '@mui/material/Grid';
import PitchingCondition from '@/views/pages/waterbody-master/pitching-condition';

const PitchingConditionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <PitchingCondition />
            </Grid>
        </Grid>
    )
}

export default PitchingConditionViewTab