'use client'
import Grid from '@mui/material/Grid';
import FoundationTable from './FoundationTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Foundation = () => {

    const { websiteSettingsPermission } = SubUserPermission();

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FoundationTable websiteSettingsPermission={websiteSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default Foundation
