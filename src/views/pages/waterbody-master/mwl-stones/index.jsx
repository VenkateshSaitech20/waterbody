'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const MWLStones = () => {
    const { mwlStonesPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={mwlStonesPermission}
                    apiEndPoint="mwl-stones"
                    menuName="MWL Stone"
                    delName="mwl stone"
                />
            </Grid>
        </Grid>
    )
}

export default MWLStones
