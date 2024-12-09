'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const FreeCatchment = () => {
    const { availabilityPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={availabilityPermission}
                    apiEndPoint="free-catchment"
                    menuName="Free Catchment"
                    delName="free catchment"
                />
            </Grid>
        </Grid>
    )
}

export default FreeCatchment