
import Grid from '@mui/material/Grid';
import TankIssue from '@/views/pages/waterbody-master/tank-issue';

const TankIssueViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TankIssue />
            </Grid>
        </Grid>
    )
}

export default TankIssueViewTab