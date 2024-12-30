import { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import frontCommonStyles from '@views/front-pages/styles.module.css'
// import WaterBodyMap from '@/components/water-body-map';
import { useIntersection } from '@/hooks/useIntersection';
import dynamic from 'next/dynamic';
const WaterBodyMap = dynamic(() => import('@/components/water-body-map'), { ssr: false });

const LandingWaterBodyMap = () => {
  const skipIntersection = useRef(true);
  const ref = useRef(null);
  const { updateIntersections } = useIntersection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false
          return
        }
        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )
    ref.current && observer.observe(ref.current)
  }, [])

  return (
    <section id='map' className='plb-[100px]' ref={ref}>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Chip size='small' variant='tonal' color='primary' label="Map" />
          <div className='flex flex-wrap flex-col items-center justify-center gap-1 text-center'>
            <Typography variant='h4'>
              <span className='relative z-[1] font-extrabold'> Waterbodies map
                <img
                  src='/images/front-pages/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                />
              </span>
            </Typography>
          </div>
        </div>
        <Grid container rowSpacing={16} columnSpacing={6} className='pbs-[50px]'>
          <WaterBodyMap flag="landing-page-map" filter="N" height="h-[550px]" />
        </Grid>
      </div>
    </section>
  )
}

export default LandingWaterBodyMap
