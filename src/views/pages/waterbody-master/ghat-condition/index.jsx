'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const FieldChannelType = () => {
    const { ghatConditionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={ghatConditionPermission}
                    apiEndPoint="ghat-condition"
                    menuName="Ghat Condition"
                    delName="ghat condition"
                />
            </Grid>
        </Grid>
    )
}

export default FieldChannelType
