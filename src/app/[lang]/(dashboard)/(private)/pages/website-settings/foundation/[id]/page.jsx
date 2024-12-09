import Grid from '@mui/material/Grid';
import FoundationDetail from '@/views/pages/website-settings/foundation/FoundationDetail';

const FoundationViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FoundationDetail />
            </Grid>
        </Grid>
    )
}

export default FoundationViewTab

