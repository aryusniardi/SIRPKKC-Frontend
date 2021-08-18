/* eslint-disable */

import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet';
import { Box, Container, Typography } from '@material-ui/core';
import PasienResults from '../components/pasien/PasienResults';
import PasienToolbar from '..//components/pasien/PasienToolbar';
import Loader from '../components/loader/loader'
import {getAllPasien} from '../data/pasien'

const Pasien = () => {
  const [pasiens, setPasiens] = useState()
  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const filteredPasien = []
  
  const getData = async() => {
    const p = await getAllPasien()

    setPasiens(p)
  }
  
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const results = filteredPasien.filter(person =>
      person.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
  }, [keyword])

  if (!(pasiens && pasiens.pasien)) {
    return <Loader />;
  }

  if (localStorage.getItem('rumahsakit')) {
    const filteringPasien = pasiens.pasien.filter((pasien) => {
      return pasien.hospital.includes(localStorage.getItem('rumahsakit'));
    });

    filteringPasien.map((pasien) => {
      filteredPasien.push(pasien);
    });
  } else {
    pasiens.pasien.map((pasien) => {
      filteredPasien.push(pasien);
    });
  }

  return (
    <>
      <Helmet>
        <title>
          Daftar Penderita Kanker | Sistem Informasi Rekapitulasi Penderita
          Kanker Kota Cimahi
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
            Daftar Pasien
          </Typography>
          <PasienToolbar refreshData={getData} keyword={keyword} setKeyword={setKeyword}/>
          <Box sx={{ pt: 3 }}>
            <PasienResults pasiens={keyword !== '' ? searchResults : filteredPasien} refreshData={getData} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Pasien;
