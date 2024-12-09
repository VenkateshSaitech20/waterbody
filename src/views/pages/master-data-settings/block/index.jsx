'use client'
import Grid from '@mui/material/Grid';
import BlockTable from './BlockTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Block = () => {
    const { masterSettingsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <BlockTable masterSettingsPermission={masterSettingsPermission} />
            </Grid>
        </Grid>
    )
}

export default Block
