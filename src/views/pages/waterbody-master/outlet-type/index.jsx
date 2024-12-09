'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const OutletType = () => {
    const { outletTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={outletTypePermission}
                    apiEndPoint="outlet-type"
                    menuName="Outlet Type"
                    delName="outlet type"
                />
            </Grid>
        </Grid>
    )
}

export default OutletType
