'use client'
import Grid from '@mui/material/Grid';
import MasterTable from '../MasterTable';
import SubUserPermission from '@/utils/SubUserPermission';

const FieldChannelType = () => {
    const { fieldChannelTypePermission } = SubUserPermission();
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <MasterTable
                    userPermission={fieldChannelTypePermission}
                    apiEndPoint="field-channel-type"
                    menuName="Field Channel Type"
                    delName="field channel type"
                />
            </Grid>
        </Grid>
    )
}

export default FieldChannelType
