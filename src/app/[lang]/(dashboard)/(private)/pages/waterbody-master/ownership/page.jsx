
import Grid from '@mui/material/Grid';
import Ownership from '@/views/pages/waterbody-master/ownership';

const OwnershipViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Ownership />
            </Grid>
        </Grid>
    )
}

export default OwnershipViewTab