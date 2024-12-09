'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const TankUniqueness = () => {
    const { tankUniquenessPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={tankUniquenessPermission}
                    apiEndPoint="tank-uniqueness"
                    menuName="Tank Uniqueness"
                    delName="tank uniqueness"
                />
            </Grid>
        </Grid>
    )
}

export default TankUniqueness
