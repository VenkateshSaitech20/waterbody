'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const Ayacutnoncultivation = () => {
    const { ayacutnoncultivationPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={ayacutnoncultivationPermission}
                    apiEndPoint="ayacutnoncultivation"
                    menuName="Ayacutnoncultivation"
                    delName="ayacutnoncultivation"
                />
            </Grid>
        </Grid>
    )
}

export default Ayacutnoncultivation