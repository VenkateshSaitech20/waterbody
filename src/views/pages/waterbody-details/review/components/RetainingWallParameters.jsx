'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const RetainingWallParameters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Retaining Wall Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Presence Of Retaining Wall:</Typography>
                    <Typography>{data?.presenceOfRetainingWall}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Retaining Wall:</Typography>
                    <Typography>{data?.retainingWall}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>No Of Sides Of Retaining Wall:</Typography>
                    <Typography>{data?.noOfSidesOfRetainingWall}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Condition Of Walls:</Typography>
                    <Typography>{data?.conditionOfWalls}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

RetainingWallParameters.propTypes = {
    data: PropTypes.any,
}

export default RetainingWallParameters
