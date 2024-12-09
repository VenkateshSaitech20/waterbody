'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const WaterSpreadAreaDetails = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Water Spread Area Details</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Issues In Water Spread Area:</Typography>
                    <Typography>{data?.issuesInWaterSpreadArea}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Invasive Species:</Typography>
                    <Typography>{data?.invasiveSpecies}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Percentage Of Spread:</Typography>
                    <Typography>{data?.percentageOfSpread}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

WaterSpreadAreaDetails.propTypes = {
    data: PropTypes.any,
}

export default WaterSpreadAreaDetails
