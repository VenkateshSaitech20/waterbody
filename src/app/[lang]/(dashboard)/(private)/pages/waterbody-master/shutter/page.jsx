
import Grid from '@mui/material/Grid';
import Shutter from '@/views/pages/waterbody-master/shutter';

const ShutterViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Shutter />
            </Grid>
        </Grid>
    )
}

export default ShutterViewTab