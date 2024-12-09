'use client'
import Grid from '@mui/material/Grid';
import PanchayatTable from './PanchayatTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Panchayat = () => {
    const { masterSettingsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <PanchayatTable masterSettingsPermission={masterSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default Panchayat
