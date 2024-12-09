'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const TankType = () => {
    const { tankTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={tankTypePermission}
                    apiEndPoint="tank-type"
                    menuName="Tank Type"
                    delName="tank type"
                />
            </Grid>
        </Grid>
    )
}

export default TankType
