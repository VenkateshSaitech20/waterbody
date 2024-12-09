'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const ShutterCondition = () => {
    const { shutterConditionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={shutterConditionPermission}
                    apiEndPoint="shutter-condition"
                    menuName="Shutter Condition"
                    delName="shutter condition"
                />
            </Grid>
        </Grid>
    )
}

export default ShutterCondition
