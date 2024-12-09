'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const TankFunction = () => {
    const { tankFunctionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={tankFunctionPermission}
                    apiEndPoint="tank-function"
                    menuName="Tank Function"
                    delName="tank function"
                />
            </Grid>
        </Grid>
    )
}

export default TankFunction
