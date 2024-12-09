'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const SurplusWeir = () => {
    const { surplusWeirPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={surplusWeirPermission}
                    apiEndPoint="surplus-weir"
                    menuName="Surplus Weir"
                    delName="surplus weir"
                />
            </Grid>
        </Grid>
    )
}

export default SurplusWeir
