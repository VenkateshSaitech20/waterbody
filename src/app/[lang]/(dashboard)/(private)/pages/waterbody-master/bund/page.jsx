import Grid from '@mui/material/Grid';
import Bund from '@/views/pages/waterbody-master/bund';

const BundViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Bund />
            </Grid>
        </Grid>
    )
}

export default BundViewTab