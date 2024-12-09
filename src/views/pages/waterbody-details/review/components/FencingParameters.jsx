'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const FencingParameters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Fencing Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Presence Of Fencing:</Typography>
                    <Typography>{data?.presenceOfFencing}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

FencingParameters.propTypes = {
    data: PropTypes.any,
}

export default FencingParameters
