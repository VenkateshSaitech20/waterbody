'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Availability = () => {
    const { availabilityPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={availabilityPermission}
                    apiEndPoint="availability"
                    menuName="Availability"
                    delName="availability"
                />
            </Grid>
        </Grid>
    )
}

export default Availability