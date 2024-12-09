'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const PitchingCondition = () => {
    const { pitchingConditionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={pitchingConditionPermission}
                    apiEndPoint="pitching-condition"
                    menuName="Pitching Condition"
                    delName="pitching condition"
                />
            </Grid>
        </Grid>
    )
}

export default PitchingCondition
