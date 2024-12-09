'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const SlitTrap = () => {
    const { slitTrapPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={slitTrapPermission}
                    apiEndPoint="slit-trap"
                    menuName="Slit Trap"
                    delName="slit trap"
                />
            </Grid>
        </Grid>
    )
}

export default SlitTrap
