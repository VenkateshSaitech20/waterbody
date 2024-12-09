
import Grid from '@mui/material/Grid';
import TankType from '@/views/pages/waterbody-master/tank-type';

const TankTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TankType />
            </Grid>
        </Grid>
    )
}

export default TankTypeViewTab