'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const SluicesSurplusType = () => {
    const { sluicesSurplusTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={sluicesSurplusTypePermission}
                    apiEndPoint="sluices-surplus-type"
                    menuName="Sluices/surplus Type"
                    delName="sluices/surplus type"
                />
            </Grid>
        </Grid>
    )
}

export default SluicesSurplusType
