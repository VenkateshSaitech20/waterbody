'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Bund = () => {
    const { catchmentTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={catchmentTypePermission}
                    apiEndPoint="catchment-type"
                    menuName="Catchment Type"
                    delName="catchment type"
                />
            </Grid>
        </Grid>
    )
}

export default Bund