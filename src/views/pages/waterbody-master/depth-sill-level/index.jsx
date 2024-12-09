'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const DepthSillLevel = () => {
    const { depthSillLevelPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={depthSillLevelPermission}
                    apiEndPoint="depth-sill-level"
                    menuName="Depth Sill Level"
                    delName="depth sill level"
                />
            </Grid>
        </Grid>
    )
}

export default DepthSillLevel
