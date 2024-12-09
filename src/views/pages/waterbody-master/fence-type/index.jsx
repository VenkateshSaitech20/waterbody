'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const FenceType = () => {
    const { fenceTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={fenceTypePermission}
                    apiEndPoint="fence-type"
                    menuName="Fence Type"
                    delName="fence type"
                />
            </Grid>
        </Grid>
    )
}

export default FenceType
