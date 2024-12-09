'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const NatureInvestment = () => {
    const { natureInvestmentPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={natureInvestmentPermission}
                    apiEndPoint="nature-investment"
                    menuName="Nature Investment"
                    delName="nature investment"
                />
            </Grid>
        </Grid>
    )
}

export default NatureInvestment
