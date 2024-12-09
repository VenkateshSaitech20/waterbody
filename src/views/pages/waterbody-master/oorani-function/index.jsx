'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const OoraniFunction = () => {
    const { ooraniFunctionPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={ooraniFunctionPermission}
                    apiEndPoint="oorani-function"
                    menuName="Oorani Function"
                    delName="oorani function"
                />
            </Grid>
        </Grid>
    )
}

export default OoraniFunction
