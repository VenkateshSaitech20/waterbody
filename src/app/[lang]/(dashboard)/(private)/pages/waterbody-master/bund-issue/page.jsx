import Grid from '@mui/material/Grid';
import BundIssue from '@/views/pages/waterbody-master/bund-issue';

const BundIssueViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <BundIssue />
            </Grid>
        </Grid>
    )
}

export default BundIssueViewTab