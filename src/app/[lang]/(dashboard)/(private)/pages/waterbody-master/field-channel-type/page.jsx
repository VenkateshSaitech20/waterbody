import Grid from '@mui/material/Grid';
import FieldChannelType from '@/views/pages/waterbody-master/field-channel-type';

const FieldChannelTypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <FieldChannelType />
            </Grid>
        </Grid>
    )
}

export default FieldChannelTypeViewTab