
import Grid from '@mui/material/Grid';
import MWLStones from '@/views/pages/waterbody-master/mwl-stones';

const MWLStonesViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MWLStones />
            </Grid>
        </Grid>
    )
}

export default MWLStonesViewTab