'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const FamilyNature = () => {
    const { familyNaturePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={familyNaturePermission}
                    apiEndPoint="family-nature"
                    menuName="Family Nature"
                    delName="family nature"
                />
            </Grid>
        </Grid>
    )
}

export default FamilyNature
