
import Grid from '@mui/material/Grid';
import SlitTrap from '@/views/pages/waterbody-master/slit-trap';

const SlitTrapViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SlitTrap />
            </Grid>
        </Grid>
    )
}

export default SlitTrapViewTab