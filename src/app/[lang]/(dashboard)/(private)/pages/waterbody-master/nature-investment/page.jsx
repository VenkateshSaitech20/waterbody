import Grid from '@mui/material/Grid';
import NatureInvestment from '@/views/pages/waterbody-master/nature-investment';

const NatureInvestmentViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <NatureInvestment />
            </Grid>
        </Grid>
    )
}

export default NatureInvestmentViewTab