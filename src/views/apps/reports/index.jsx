'use client'
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import CustomTabList from '@core/components/mui/TabList';
import PropTypes from 'prop-types';

const Ecommerce = ({ tabContentList }) => {
    const [activeTab, setActiveTab] = useState('ProductListTable')

    const handleChange = (event, value) => {
        setActiveTab(value)
    }

    return (
        <TabContext value={activeTab}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
                        <Tab label='Products' value='ProductListTable' />
                        <Tab label='Customer Segments' value='CustomerListTable' />
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

Ecommerce.propTypes = {
    tabContentList: PropTypes.object,
};

export default Ecommerce;