'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const EmbankmentDetails = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Embankment Details</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Nature Of Embankment:</Typography>
                    <Typography>{data?.natureOfEmbankment}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Bund length:</Typography>
                    <Typography>{data?.bundlength}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Bund top width:</Typography>
                    <Typography>{data?.bundtopwidth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>slope foreside:</Typography>
                    <Typography>{data?.slopeforeside}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>slope rearside:</Typography>
                    <Typography>{data?.sloperearside}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Presence Of Walking Pavement:</Typography>
                    <Typography>{data?.presenceOfWalkingPavement}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Length Of Revetment Needed:</Typography>
                    <Typography>{data?.lengthOfRevetmentNeeded}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Presence Of Stone Pitching:</Typography>
                    <Typography>{data?.presenceOfStonePitching}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Stone pitching condition Needed:</Typography>
                    <Typography>{data?.stonepitchingconditionNeeded}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Bund Functionalities:</Typography>
                    <Typography>{data?.bundFunctionalities}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Need For Walking Track</Typography>
                    <Typography>{data?.needForWalkingTrack}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Issues In Bund</Typography>
                    <Typography>{data?.issuesInBund}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

EmbankmentDetails.propTypes = {
    data: PropTypes.any,
}

export default EmbankmentDetails
