'use client'
import Grid from '@mui/material/Grid';
import HabitationTable from './HabitationTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Habitation = () => {
    const { masterSettingsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <HabitationTable masterSettingsPermission={masterSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default Habitation
