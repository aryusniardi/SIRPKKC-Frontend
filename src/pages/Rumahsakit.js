/* eslint-disable */

import react, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import RumahsakitCard from '../components/rumahsakit/RumahsakitCard';
import RumahsakitListToolbar from '../components/rumahsakit/RumahsakitListToolbar';
import Loader from '../components/loader/loader'
import { getAllRumahsakit } from '../data/rumahsakit';

const RumahsakitList = () => {
  const [rumahsakit, setRumahsakit] = useState();

  const getData = async() => {
    const rs = await getAllRumahsakit()

    setRumahsakit(rs)
  }
  
  useEffect(() => {
    getData()
  }, []);

  if (!(rumahsakit && rumahsakit.rumahsakit)) {
    return <Loader />
  }
  
  return (
    <>
      <Helmet>
        <title>
          Daftar Rumahsakit | Sistem Informasi Rekapitulasi Penderita Kanker
          Kota Cimahi
        </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Typography
            style={{
              fontWeight: 700,
              paddingBottom: 16,
              fontSize: '1.4rem'
            }}
            color="textPrimary"
          >
            Daftar Rumahsakit
          </Typography>
          {localStorage.getItem('role') &&
          localStorage.getItem('role') === 'super admin' ? (
            <RumahsakitListToolbar refreshData={getData} />
          ) : (
            ''
          )}
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {rumahsakit.rumahsakit.map((rs) => (
                <Grid item key={rs._id} lg={4} md={6} xs={12}>
                  <RumahsakitCard refreshData={getData} rs={rs} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RumahsakitList;
