'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const ExoticSpecies = () => {
    const { exoticSpeciesPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={exoticSpeciesPermission}
                    apiEndPoint="exotic-species"
                    menuName="Exotic Species"
                    delName="exotic species"
                />
            </Grid>
        </Grid>
    )
}

export default ExoticSpecies
