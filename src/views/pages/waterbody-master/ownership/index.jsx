'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Ownership = () => {
    const { ownershipPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={ownershipPermission}
                    apiEndPoint="ownership"
                    menuName="Ownership"
                    delName="ownership"
                />
            </Grid>
        </Grid>
    )
}

export default Ownership
