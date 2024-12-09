'use client'
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import CustomTabList from '@core/components/mui/TabList';
import PropTypes from 'prop-types';

const MasterDataSettings = ({ tabContentList }) => {
    const [activeTab, setActiveTab] = useState('country');

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    return (
        <TabContext value={activeTab}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
                        <Tab label='Country' value='country' />
                        <Tab label='State' value='state' />
                        <Tab label='District' value='district' />
                        {/* <Tab label='City/Town' value='city' /> */}
                        <Tab label='Taluk' value='taluk' />
                        <Tab label='Block' value='block' />
                        <Tab label='Panchayat' value='panchayat' />
                        <Tab label='Jurisdiction' value='jurisdiction' />
                        <Tab label='Habitation' value='habitation' />
                        <Tab label='Urban Local Bodies' value='urban-local-bodies' />
                    </CustomTabList>
                </Grid>
                <Grid item xs={12}>
                    <TabPanel value={activeTab} className='p-0'>
                        {tabContentList[activeTab]}
                    </TabPanel>
                </Grid>
            </Grid>
        </TabContext>
    )
}
MasterDataSettings.propTypes = {
    tabContentList: PropTypes.object,
};

export default MasterDataSettings;
