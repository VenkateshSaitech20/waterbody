
import Grid from '@mui/material/Grid';
import Source from '@/views/pages/waterbody-master/source';

const SourceViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Source />
            </Grid>
        </Grid>
    )
}

export default SourceViewTab