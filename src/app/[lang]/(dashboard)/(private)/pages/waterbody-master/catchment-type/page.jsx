import Grid from '@mui/material/Grid';
import CatchmentType from '@/views/pages/waterbody-master/catchment-type';

const CatchmentTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CatchmentType />
            </Grid>
        </Grid>
    )
}

export default CatchmentTypeViewTab