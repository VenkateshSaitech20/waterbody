import Typography from '@mui/material/Typography';
import classnames from 'classnames';
import frontCommonStyles from '@views/front-pages/styles.module.css';
import { useCallback, useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import Loader from '@/components/loader';
import { Grid } from '@mui/material';

const Foundation = () => {
    const [foundationsData, setFoundationsData] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);

    const getFounddation = useCallback(async (searchText) => {
        setIsLoading(true);
        const response = await apiClient.get("/api/website-settings/foundation");
        if (response.data.result === true) {
            setFoundationsData(response.data.message);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getFounddation();
    }, []);

    return (
        <>
            {(isLoading) && <Loader />}
            <section className={classnames('flex flex-col pbs-[88px] pbe-[100px] bg-backgroundDefault')}>
                <div className={classnames('flex max-md:flex-col max-sm:flex-wrap is-full gap-6', frontCommonStyles.layoutSpacing)}>
                    <div className='lg:pis-10'>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={12} lg={12}>
                                {foundationsData?.map((item) => (
                                    <div className="mb-5" key={item.id}>
                                        <Typography variant='h4'><span className='relative z-[1] font-extrabold mb-4'>{item.title}</span></Typography>
                                        <Typography variant='p'>{item.description}</Typography>
                                    </div>
                                ))}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Foundation
