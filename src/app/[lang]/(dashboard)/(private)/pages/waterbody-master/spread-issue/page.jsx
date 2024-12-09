
import Grid from '@mui/material/Grid';
import SpreadIssue from '@/views/pages/waterbody-master/spread-issue';

const SpreadIssueViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SpreadIssue />
            </Grid>
        </Grid>
    )
}

export default SpreadIssueViewTab