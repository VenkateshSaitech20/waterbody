'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const CrossSection = () => {
    const { crossSectionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={crossSectionPermission}
                    apiEndPoint="cross-section"
                    menuName="Cross Section"
                    delName="cross section"
                />
            </Grid>
        </Grid>
    )
}

export default CrossSection
