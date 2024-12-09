'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const InletType = () => {
    const { ghatConditionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={ghatConditionPermission}
                    apiEndPoint="inlet-type"
                    menuName="Inlet Type"
                    delName="inlet type"
                />
            </Grid>
        </Grid>
    )
}

export default InletType
