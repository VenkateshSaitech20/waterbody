'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Condition = () => {
    const { conditionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={conditionPermission}
                    apiEndPoint="condition"
                    menuName="Condition"
                    delName="condition"
                />
            </Grid>
        </Grid>
    )
}

export default Condition
