/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { red, green, indigo, orange, yellow } from '@material-ui/core/colors';
import {
  ShowChartRounded as ChartIcon,
  MapRounded as MapIcon,
  BugReportRounded as BugsIcon,
  GroupRounded as GroupIcon,
  LocalHospitalRounded as HospitalIcon,
  LocationCityRounded as KelurahanIcon,
} from '@material-ui/icons';
import DashboardCard from '../components/dashboard/DashboardCard';
import MapKotaCimahi from 'src/components/dashboard/MapKotaCimahi';
import GraphBulan from 'src/components/dashboard//GraphBulan';
import GraphicJenisKelamin from 'src/components/dashboard/GraphicJenisKelamin';
import GraphicKelompokUsia from 'src/components/dashboard/GraphicKelompokUsia';
import DashboardListToolbar from 'src/components/dashboard/DashboardListToolbar';
import GraphDiagnosa from 'src/components/dashboard/GraphDiagnosa';
import Loader from '../components/loader/loader';
import axios from 'axios'

const Dashboard = () => {
  const today = new Date()
  
  const [informasi, setInformasi] = useState();
  const [data, setData] = useState();
  const [tahun, setTahun] = useState(today.getFullYear())
  const [wilayah, setWilayah] = useState('')
  const [pilihan, setPilihan] = useState('')

  const getInformasi = async() => {
    const response = await axios.post(`http://localhost:1337/dashboard`)
    setInformasi(response.data)
  }

  const getData = async() => {    
    const data = {
      tahun: tahun
    }
    
    if (
      (wilayah === 'rumahsakit' && pilihan !== '')) {
        const d = await axios.post(
          `http://localhost:1337/index/rumahsakit/${pilihan}`,
          data
        );

        setData(d.data);
    } else if ((wilayah === 'kelurahan' && pilihan !== '')) {
      const d = await axios.post(
        `http://localhost:1337/index/kelurahan/${pilihan}`,
        data
      );

      setData(d.data);
    } else if ((wilayah === 'kecamatan' && pilihan !== '')) {
        const d = await axios.post(`http://localhost:1337/index/kecamatan/${pilihan}`, data)

        setData(d.data);
    } else if (wilayah === '' || pilihan === '') {
      const d = await axios.post(`http://localhost:1337/index`, data)
      setData(d.data);
    }
  }
  
  useEffect(() => {
    getInformasi()
  }, []);

  useEffect(() => {
    getData();

    if (!(data)) {
      return <Loader />;
    }
  }, [pilihan, wilayah, tahun])

  if (!(data && informasi)) {
    return <Loader />;
  }

  const filteredDiagnosa = data.diagnosa.filter((diagnosa) => {
    return !diagnosa._id.includes('benign');
  });

  const cardList = [
    {
      Icon: (
        <MapIcon
          style={{ color: indigo[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: indigo[600],
      title: 'Jumlah Penduduk',
      text: informasi.jumlahPenduduk
    },
    {
      Icon: (
        <ChartIcon
          style={{ color: red[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: red[600],
      title: 'Jumlah Penderita',
      text: informasi.jumlahPenderita
    },
    {
      Icon: (
        <HospitalIcon
          style={{ color: green[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: green[600],
      title: 'Rumahsakit dengan Pasien Terbanyak',
      text: informasi.rumahsakit._id
    },
    {
      Icon: (
        <KelurahanIcon
          style={{ color: orange[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: orange[600],
      title: 'Kelurahan dengan Penderita Terbanyak',
      text: informasi.kelurahan._id
    },
    {
      Icon: (
        <KelurahanIcon
          style={{ color: yellow[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: yellow[600],
      title: 'Kecamatan dengan Penderita Terbanyak',
      text: informasi.kecamatan._id
    }
  ];

  const secondCardList = [
    {
      Icon: (
        <MapIcon
          style={{ color: indigo[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: indigo[600],
      title: 'Jumlah Penduduk',
      text: data.jumlahPenduduk
    },
    {
      Icon: (
        <ChartIcon
          style={{ color: red[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: red[600],
      title: 'Jumlah Penderita',
      text: data.jumlahPenderita
    },
    {
      Icon: (
        <BugsIcon
          style={{ color: orange[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: orange[600],
      title: 'Diagnosa Tertinggi',
      text: filteredDiagnosa[0] ? filteredDiagnosa[0]._id : '-'
    },
    {
      Icon: (
        <GroupIcon
          style={{ color: green[600], fontSize: '3.2rem', marginBottom: 8 }}
        />
      ),
      color: green[600],
      title: 'Kelompok Usia Tertinggi',
      text: data.kelompokUsia[0] ? data.kelompokUsia[0]._id : '-'
    }
  ];

  return (
    <>
      <Helmet>
        <title>
          Dashboard | Sistem Informasi Rekapitulasi Penderita Kanker di Kota
          Cimahi
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
            Dashboard Statistik Kasus Penderita Kanker Kota Cimahi
          </Typography>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            {cardList.map((list) => (
              <Grid item lg={2.4} sm={6} xs={12} key={list.title}>
                <DashboardCard
                  Icon={list.Icon}
                  itemColor={list.color}
                  title={list.title}
                  text={list.text}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <DashboardListToolbar
                wilayah={wilayah}
                tahun={tahun}
                setTahun={setTahun}
                setWilayah={setWilayah}
                pilihan={pilihan}
                setPilihan={setPilihan}
                refreshData={getData}
              />
            </Grid>
            {wilayah === '' || wilayah === 'kecamatan' ? (
              <Grid
                item
                lg={8}
                md={8}
                xs={12}
                style={{ width: '100% !important' }}
              >
                <MapKotaCimahi
                  data={data.kelurahan}
                  kecamatan={pilihan}
                  style={{ width: '100% !important' }}
                />
              </Grid>
            ) : (
              ''
            )}
            <Grid item lg={4} xs={12}>
              <GraphDiagnosa
                diagnosa={filteredDiagnosa}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                style={{ fontWeight: 700, paddingTop: 16 }}
                color="textPrimary"
              >
                Informasi Daerah
              </Typography>
            </Grid>
            {secondCardList.map((list) => (
              <Grid item lg={3} sm={6} xs={12} key={list.title}>
                <DashboardCard
                  Icon={list.Icon}
                  itemColor={list.color}
                  title={list.title}
                  text={list.text}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <GraphBulan data={data.bulanMasuk} />
            </Grid>

            <Grid item md={6} xs={12}>
              <GraphicKelompokUsia
                kelompokUsia={data.kelompokUsia}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <GraphicJenisKelamin
                lakilaki={data.laki_laki}
                perempuan={data.perempuan}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
