'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const BarrelType = () => {
    const { barrelTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={barrelTypePermission}
                    apiEndPoint="barrel-type"
                    menuName="Barrel Type"
                    delName="barrel type"
                />
            </Grid>
        </Grid>
    )
}

export default BarrelType
