'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const GhatsParameters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Ghats Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Ghats Parameter:</Typography>
                    <Typography>{data?.ghatsParameter}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Need For Ghats:</Typography>
                    <Typography>{data?.needForGhats}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Ghats Count:</Typography>
                    <Typography>{data?.ghatsCount}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Condition Of Ghast:</Typography>
                    <Typography>{data?.ghatsList?.conditionOfGhats}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

GhatsParameters.propTypes = {
    data: PropTypes.any,
}

export default GhatsParameters
