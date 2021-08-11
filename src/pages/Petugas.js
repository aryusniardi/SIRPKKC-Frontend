/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import Loader from '../components/loader/loader';
import { getAllPetugas } from '../data/petugas';
import PetugasListToolbar from 'src/components/petugas/PetugasListToolbar';
import TablePetugas from 'src/components/petugas/TablePetugas';

const Petugas = () => {
  const [petugas, setPetugas] = useState();

  const getData = async () => {
    const p = await getAllPetugas();

    setPetugas(p);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!(petugas && petugas.users)) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>
          Daftar Petugas Rumahsakit | Sistem Informasi Rekapitulasi Penderita Kanker
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
            Daftar Petugas Rumahsakit
          </Typography>
          <PetugasListToolbar refreshData={getData} />
          <Box sx={{ pt: 3 }}>
            <TablePetugas refreshData={getData} petugas={petugas} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Petugas