import Grid from '@mui/material/Grid';
import WaterSpreadArea from '@/views/pages/waterbody-master/water-spread-area';

const WaterSpreadAreaViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <WaterSpreadArea />
            </Grid>
        </Grid>
    )
}

export default WaterSpreadAreaViewTab