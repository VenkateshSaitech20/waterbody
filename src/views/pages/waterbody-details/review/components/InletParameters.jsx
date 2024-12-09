'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const InletParameters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Inlet Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Inlet Parameter:</Typography>
                    <Typography>{data?.inletParameter}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Inlet Count:</Typography>
                    <Typography>{data?.inletCount}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Nature Of Inlet:</Typography>
                    <Typography>{data?.inletList?.natureOfInlet}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Condition Of Inlet:</Typography>
                    <Typography>{data?.inletList?.conditionOfInlet}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Slit Trap:</Typography>
                    <Typography>{data?.inletList?.slitTrap}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

InletParameters.propTypes = {
    data: PropTypes.any,
}

export default InletParameters
