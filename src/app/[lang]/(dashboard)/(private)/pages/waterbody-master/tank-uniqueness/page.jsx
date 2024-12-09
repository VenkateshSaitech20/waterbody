
import Grid from '@mui/material/Grid';
import TankUniqueness from '@/views/pages/waterbody-master/tank-uniqueness';

const TankUniquenessViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TankUniqueness />
            </Grid>
        </Grid>
    )
}

export default TankUniquenessViewTab