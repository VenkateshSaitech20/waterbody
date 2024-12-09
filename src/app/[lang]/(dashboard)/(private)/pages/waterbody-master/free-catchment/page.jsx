import Grid from '@mui/material/Grid';
import FreeCatchment from '@/views/pages/waterbody-master/free-catchment';

const FreeCatchmentViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FreeCatchment />
            </Grid>
        </Grid>
    )
}

export default FreeCatchmentViewTab