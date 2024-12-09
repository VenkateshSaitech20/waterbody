'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const DistributionLand = () => {
    const { distributionLandPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={distributionLandPermission}
                    apiEndPoint="distribution-land"
                    menuName="Distribution Land"
                    delName="distribution land"
                />
            </Grid>
        </Grid>
    )
}

export default DistributionLand
