
import Grid from '@mui/material/Grid';
import TempleTankType from '@/views/pages/waterbody-master/temple-tank-type';

const TempleTankTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TempleTankType />
            </Grid>
        </Grid>
    )
}

export default TempleTankTypeViewTab