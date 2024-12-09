'use client'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PropTypes from "prop-types";
import CustomAvatar from '@core/components/mui/Avatar';
import { Grid } from '@mui/material';

const ReviewImages = ({ data }) => {
    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5">Images</Typography>
                <Divider className='mlb-4' />
                <Grid container className='bs-full' >
                    {
                        data?.map((item) => (
                            <Grid item md={3} xl={2} key={item.id} className="p-2">
                                <CustomAvatar src={item?.image} variant='rounded' size={150} alt='review-image' className="mb-2" />
                                <Typography>{item?.description}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

ReviewImages.propTypes = {
    data: PropTypes.any,
}

export default ReviewImages
