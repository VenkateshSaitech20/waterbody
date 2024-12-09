'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const FunctionalParameters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Functional Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Functions:</Typography>
                    <Typography>{data?.functions}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>No Of Animals:</Typography>
                    <Typography>{data?.functionsList?.livestock?.noOfAnimals}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>No Of Dependent Families:</Typography>
                    <Typography>{data?.functionsList?.livestock?.noOfDependentFamilies}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

FunctionalParameters.propTypes = {
    data: PropTypes.any,
}

export default FunctionalParameters
