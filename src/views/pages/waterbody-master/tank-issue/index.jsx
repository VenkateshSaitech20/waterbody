'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const TankIssue = () => {
    const { tankIssuePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={tankIssuePermission}
                    apiEndPoint="tank-issue"
                    menuName="Tank Issue"
                    delName="tank issue"
                />
            </Grid>
        </Grid>
    )
}

export default TankIssue
