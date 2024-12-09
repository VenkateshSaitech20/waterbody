'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const PresenceOfWUA = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Presence Of WUA</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Presence Of WUA:</Typography>
                    <Typography>{data?.presenceOfWUA}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

PresenceOfWUA.propTypes = {
    data: PropTypes.any,
}

export default PresenceOfWUA
