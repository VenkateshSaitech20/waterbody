'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Cropping = () => {
    const { croppingPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={croppingPermission}
                    apiEndPoint="cropping"
                    menuName="Cropping"
                    delName="cropping"
                />
            </Grid>
        </Grid>
    )
}

export default Cropping
