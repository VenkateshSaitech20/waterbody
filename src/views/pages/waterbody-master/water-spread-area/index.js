'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const WaterSpreadArea = () => {
    const { typePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={typePermission}
                    apiEndPoint="water-spread-area"
                    menuName="Water Spread Area"
                    delName="water spread area"
                />
            </Grid>
        </Grid>
    )
}

export default WaterSpreadArea
