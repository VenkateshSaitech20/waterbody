import Grid from '@mui/material/Grid';
import FenceType from '@/views/pages/waterbody-master/fence-type';

const FenceTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FenceType />
            </Grid>
        </Grid>
    )
}

export default FenceTypeViewTab