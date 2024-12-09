'use client'
import Grid from '@mui/material/Grid';
import JurisdictionTable from './JurisdictionTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Panchayat = () => {
    const { masterSettingsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <JurisdictionTable masterSettingsPermission={masterSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default Panchayat
