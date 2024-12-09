import Grid from '@mui/material/Grid';
import InletType from '@/views/pages/waterbody-master/inlet-type';

const InletTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <InletType />
            </Grid>
        </Grid>
    )
}

export default InletTypeViewTab