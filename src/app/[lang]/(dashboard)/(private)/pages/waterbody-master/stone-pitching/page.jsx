
import Grid from '@mui/material/Grid';
import StonePitching from '@/views/pages/waterbody-master/stone-pitching';

const StonePitchingViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <StonePitching />
            </Grid>
        </Grid>
    )
}

export default StonePitchingViewTab