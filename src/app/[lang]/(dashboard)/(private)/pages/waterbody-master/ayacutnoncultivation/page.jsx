import Grid from '@mui/material/Grid';
import Ayacutnoncultivation from '@/views/pages/waterbody-master/ayacutnoncultivation';

const AyacutnoncultivationViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Ayacutnoncultivation />
            </Grid>
        </Grid>
    )
}

export default AyacutnoncultivationViewTab