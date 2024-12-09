
import Grid from '@mui/material/Grid';
import SurplusWeir from '@/views/pages/waterbody-master/surplus-weir';

const SurplusWeirViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SurplusWeir />
            </Grid>
        </Grid>
    )
}

export default SurplusWeirViewTab