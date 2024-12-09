'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const BoundaryDropPoint = () => {
    const { boundaryDropPointsPermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={boundaryDropPointsPermission}
                    apiEndPoint="boundary-drop-point"
                    menuName="Boundary Drop Point"
                    delName="boundary drop point"
                />
            </Grid>
        </Grid>
    )
}

export default BoundaryDropPoint
