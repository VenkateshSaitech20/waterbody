import Grid from '@mui/material/Grid';
import FamilyNature from '@/views/pages/waterbody-master/family-nature';

const FamilyNatureViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FamilyNature />
            </Grid>
        </Grid>
    )
}

export default FamilyNatureViewTab