'use client'
import Grid from '@mui/material/Grid';
import SubUserPermission from '@/utils/SubUserPermission';
import GWBTable from './GWBTable';

const GWB = () => {
  const { gwbPermission } = SubUserPermission();
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <GWBTable gwbPermission={gwbPermission} />
      </Grid>
    </Grid>
  )
}

export default GWB
