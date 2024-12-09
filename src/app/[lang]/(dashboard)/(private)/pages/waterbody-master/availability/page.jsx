import Grid from '@mui/material/Grid';
import Availability from '@/views/pages/waterbody-master/availability';

const AvailabilityViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Availability />
            </Grid>
        </Grid>
    )
}

export default AvailabilityViewTab


