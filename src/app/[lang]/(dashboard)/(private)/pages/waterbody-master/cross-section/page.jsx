import Grid from '@mui/material/Grid';
import CrossSection from '@/views/pages/waterbody-master/cross-section';

const CrossSectionViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CrossSection />
            </Grid>
        </Grid>
    )
}

export default CrossSectionViewTab