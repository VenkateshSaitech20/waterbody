
import Grid from '@mui/material/Grid';
import OoraniFunction from '@/views/pages/waterbody-master/oorani-function';

const OoraniFunctionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <OoraniFunction />
            </Grid>
        </Grid>
    )
}

export default OoraniFunctionViewTab