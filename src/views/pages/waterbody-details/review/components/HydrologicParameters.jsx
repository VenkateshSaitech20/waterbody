'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";

const HydrologicParamaters = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Hydrologic Parameters</Typography>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Name:</Typography>
                    <Typography>{data?.name}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Water Spread Area:</Typography>
                    <Typography>{data?.waterSpreadArea}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Original Capacity:</Typography>
                    <Typography>{data?.originalCapacity}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>No Of Fillings:</Typography>
                    <Typography>{data?.noOfFillings}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Month  Of First Filling:</Typography>
                    <Typography>{data?.monthOfFirstFilling}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Month Of  Scarcity:</Typography>
                    <Typography>{data?.monthOfScarcity}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Sources of Supply:</Typography>
                    <Typography>{data?.sourcesOfSupply.join(', ')}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-2'>
                    <Typography variant='h6'>No Of Sources:</Typography>
                    <Typography>{data?.noOfSources}</Typography>
                </div>
                <Divider className='mlb-4' />
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Sources:</Typography>
                </div>
                <Divider className='mlb-4' />
                {/* <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Free Catchment:</Typography>
                </div> */}
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Contri Start:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.contriStart}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Contri End:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.contriEnd}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Type Of Cross:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.typeOfCross}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Head Top Width:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.headTopWidth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Head Bed:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.headBed}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Head Depth:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.headDepth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Middle Top Width:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.middleTopWidth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Middle Bed:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.middleBed}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Middle Depth:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.middleDepth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Tail Top Width:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.tailTopWidth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Tail Bed:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.tailBed}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>TailDepth:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.tailDepth}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Issues:</Typography>
                    <Typography>{data?.sources?.freeCatchment?.issues}</Typography>
                </div>
                <div className='flex items-center flex-wrap gap-x-1.5 mb-1'>
                    <Typography variant='h6'>Nature Of Subsurface:</Typography>
                    <Typography>{data?.sources?.subsurfaceFlow?.natureOfSubsurface}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

HydrologicParamaters.propTypes = {
    data: PropTypes.any,
}

export default HydrologicParamaters
