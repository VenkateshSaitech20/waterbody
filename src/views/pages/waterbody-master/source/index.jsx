'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Source = () => {
    const { sourcePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={sourcePermission}
                    apiEndPoint="source"
                    menuName="Source"
                    delName="source"
                />
            </Grid>
        </Grid>
    )
}

export default Source
