'use client'
import Grid from '@mui/material/Grid';
import TalukTable from './TalukTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Taluk = () => {
    const { masterSettingsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <TalukTable masterSettingsPermission={masterSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default Taluk
