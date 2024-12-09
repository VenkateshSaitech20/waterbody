'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const StreamIssue = () => {
    const { streamIssuePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={streamIssuePermission}
                    apiEndPoint="stream-issue"
                    menuName="Stream Issue"
                    delName="stream issue"
                />
            </Grid>
        </Grid>
    )
}

export default StreamIssue
