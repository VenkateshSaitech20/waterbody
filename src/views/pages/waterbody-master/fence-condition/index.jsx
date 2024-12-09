'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const FenceCondition = () => {
    const { fenceConditionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={fenceConditionPermission}
                    apiEndPoint="fence-condition"
                    menuName="Fence Condition"
                    delName="fence condition"
                />
            </Grid>
        </Grid>
    )
}

export default FenceCondition
