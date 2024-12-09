
import Grid from '@mui/material/Grid';
import TankFunction from '@/views/pages/waterbody-master/tank-function';

const TankFunctionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TankFunction />
            </Grid>
        </Grid>
    )
}

export default TankFunctionViewTab