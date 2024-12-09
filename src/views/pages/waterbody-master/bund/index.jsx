'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Bund = () => {
    const { bundPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={bundPermission}
                    apiEndPoint="bund"
                    menuName="Bund"
                    delName="bund"
                />
            </Grid>
        </Grid>
    )
}

export default Bund
