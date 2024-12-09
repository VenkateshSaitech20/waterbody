'use client'
import Grid from '@mui/material/Grid';
import UrbanLocalBodiesTable from './UrbanLocalBodiesTable';
import SubUserPermission from '@/utils/SubUserPermission';

const UrbanLocalBodies = () => {
    const { masterSettingsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <UrbanLocalBodiesTable masterSettingsPermission={masterSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default UrbanLocalBodies
