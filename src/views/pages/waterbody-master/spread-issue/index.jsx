'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const SpreadIssue = () => {
    const { spreadIssuePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={spreadIssuePermission}
                    apiEndPoint="spread-issue"
                    menuName="Spread Issue"
                    delName="spread issue"
                />
            </Grid>
        </Grid>
    )
}

export default SpreadIssue
