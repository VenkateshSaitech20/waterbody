
import Grid from '@mui/material/Grid';
import Type from '@/views/pages/waterbody-master/type';

const TypeViewTab = async () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Type />
            </Grid>
        </Grid>
    )
}

export default TypeViewTab