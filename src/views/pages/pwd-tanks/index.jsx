'use client'
import Grid from '@mui/material/Grid';
import SubUserPermission from '@/utils/SubUserPermission';
import PWDTankTable from './PWDTankTable';

const PWDTanks = () => {
  const { pwdTankPermission } = SubUserPermission();
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PWDTankTable pwdTankPermission={pwdTankPermission} />
      </Grid>
    </Grid>
  )
}

export default PWDTanks
