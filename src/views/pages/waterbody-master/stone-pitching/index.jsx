'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const StonePitching = () => {
    const { stonePitchingPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={stonePitchingPermission}
                    apiEndPoint="stone-pitching"
                    menuName="Stone Pitching"
                    delName="stone pitching"
                />
            </Grid>
        </Grid>
    )
}

export default StonePitching
