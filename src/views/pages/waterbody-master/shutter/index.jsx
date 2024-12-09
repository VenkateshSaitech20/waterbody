'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Shutter = () => {
    const { shutterPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={shutterPermission}
                    apiEndPoint="shutter"
                    menuName="Shutter"
                    delName="shutter"
                />
            </Grid>
        </Grid>
    )
}

export default Shutter
