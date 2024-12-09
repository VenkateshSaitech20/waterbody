
import Grid from '@mui/material/Grid';
import SluicesSurplusType from '@/views/pages/waterbody-master/sluices-surplus-type';

const SluicesSurplusTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SluicesSurplusType />
            </Grid>
        </Grid>
    )
}

export default SluicesSurplusTypeViewTab