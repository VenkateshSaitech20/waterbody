'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const TempleTankType = () => {
    const { templeTankTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={templeTankTypePermission}
                    apiEndPoint="temple-tank-type"
                    menuName="Temple Tank Type"
                    delName="temple tank type"
                />
            </Grid>
        </Grid>
    )
}

export default TempleTankType
