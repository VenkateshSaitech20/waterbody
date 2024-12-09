'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Type = () => {
    const { typePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={typePermission}
                    apiEndPoint="type"
                    menuName="Type"
                    delName="type"
                />
            </Grid>
        </Grid>
    )
}

export default Type
