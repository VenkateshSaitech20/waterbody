import Grid from '@mui/material/Grid';
import BarrelType from '@/views/pages/waterbody-master/barrel-type';

const BarrelTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <BarrelType />
            </Grid>
        </Grid>
    )
}

export default BarrelTypeViewTab