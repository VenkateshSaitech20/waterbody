'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const BundIssue = () => {
    const { bundIssuePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={bundIssuePermission}
                    apiEndPoint="bund-issue"
                    menuName="Bund Issue"
                    delName="bund issue"
                />
            </Grid>
        </Grid>
    )
}

export default BundIssue
