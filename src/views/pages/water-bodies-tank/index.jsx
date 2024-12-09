'use client'
import Grid from '@mui/material/Grid';
import SubUserPermission from '@/utils/SubUserPermission';
import WBsTankTable from './WBsTankTable';

const WBsTank = () => {
  const { tankWBDPermission } = SubUserPermission();
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <WBsTankTable tankWBDPermission={tankWBDPermission} />
      </Grid>
    </Grid>
  )
}

export default WBsTank
