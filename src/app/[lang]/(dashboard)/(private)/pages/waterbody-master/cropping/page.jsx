import Grid from '@mui/material/Grid';
import Cropping from '@/views/pages/waterbody-master/cropping';

const CroppingViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Cropping />
            </Grid>
        </Grid>
    )
}

export default CroppingViewTab