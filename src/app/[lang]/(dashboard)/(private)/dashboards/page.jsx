import Grid from '@mui/material/Grid';
import CardsWithCount from '@views/dashboards/CardsWithCount';
import CardsWithTable from '@/views/dashboards/CardsWithTable';
import WaterBodyMap from '@/components/water-body-map';

const HomeDashboard = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <CardsWithCount />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <CardsWithTable />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <WaterBodyMap filter="Y" height="h-[550px]" />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default HomeDashboard
