import Grid from '@mui/material/Grid';
import ExoticSpecies from '@/views/pages/waterbody-master/exotic-species';

const ExoticSpeciesViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <ExoticSpecies />
            </Grid>
        </Grid>
    )
}

export default ExoticSpeciesViewTab