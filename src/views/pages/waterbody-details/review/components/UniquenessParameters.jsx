'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const UniquenessParameters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Uniqueness Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Uniqueness:</Typography>
                    <Typography>{data?.uniqueness}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Description:</Typography>
                    <Typography>{data?.description}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Presence Of Recreational Space:</Typography>
                    <Typography>{data?.presenceOfRecreationalSpace}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

UniquenessParameters.propTypes = {
    data: PropTypes.any,
}

export default UniquenessParameters
