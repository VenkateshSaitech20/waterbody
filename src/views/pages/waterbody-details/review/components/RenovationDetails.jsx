'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const RenovationDetails = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Renovation Details</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Year Of Renovation:</Typography>
                    <Typography>{data?.yearOfRenovation}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Name Of  Renovation Scheme:</Typography>
                    <Typography>{data?.nameOfRenovationScheme}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Amount Spent:</Typography>
                    <Typography>{data?.amountSpent}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Activities Undertaken:</Typography>
                    <Typography>{data?.activitiesUndertaken.join(', ')}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

RenovationDetails.propTypes = {
    data: PropTypes.any,
}

export default RenovationDetails
