import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import frontCommonStyles from '@views/front-pages/styles.module.css';
import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import apiWBDClient from '@/utils/apiWBDClient';
import axios from 'axios';
import CustomAvatar from '@/@core/components/mui/Avatar';

const ProductStat = () => {
  const [keyAchievements, setKeyAchievements] = useState([]);;
  const [isLoading, setIsLoading] = useState(false);

  const getKeyAchievements = async () => {
    setIsLoading(true);
    const response = await apiWBDClient.get(`/dashboard/wbd-count/get`);
    if (response?.data?.result === true) {
      if (response?.data?.message) {
        setKeyAchievements(response.data.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getKeyAchievements();
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {
        !isLoading && (
          <section className='plb-16'>
            <div className={frontCommonStyles.layoutSpacing}>
              <Grid container spacing={6}>
                {keyAchievements?.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.id}>
                    <div className='flex flex-col items-center justify-center gap-4 p-6 border rounded' style={{ borderColor: `${item.colorCode}` }}>
                      <CustomAvatar color={item.color} skin='light' variant='rounded' size={50}>
                        <i className={item.icon} style={{ height: '30px', width: '30px' }} />
                      </CustomAvatar>
                      <div className='flex flex-col gap-0.5 text-center'>
                        <Typography variant='h2'>{item?.count}</Typography>
                        <Typography className='font-medium'>{item?.name}</Typography>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </section>
        )
      }
    </>
  )
}

export default ProductStat
