import Grid from '@mui/material/Grid';
import BoundaryDropPoint from '@/views/pages/waterbody-master/boundary-drop-point';

const BoundaryDropPointViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <BoundaryDropPoint />
            </Grid>
        </Grid>
    )
}

export default BoundaryDropPointViewTab