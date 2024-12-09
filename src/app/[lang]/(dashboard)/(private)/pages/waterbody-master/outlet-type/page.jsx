
import Grid from '@mui/material/Grid';
import OutletType from '@/views/pages/waterbody-master/outlet-type';

const OutletTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <OutletType />
            </Grid>
        </Grid>
    )
}

export default OutletTypeViewTab