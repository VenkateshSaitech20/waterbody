
import Grid from '@mui/material/Grid';
import StreamIssue from '@/views/pages/waterbody-master/stream-issue';

const StreamIssueViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <StreamIssue />
            </Grid>
        </Grid>
    )
}

export default StreamIssueViewTab