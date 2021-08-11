/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import {
  GetAppRounded as ExportIcon
} from '@material-ui/icons'
import Loader from '../components/loader/loader';
import {useReactToPrint} from 'react-to-print';

import LaporanFilter from '../components/laporan/LaporanFilter';
import TableLaporan from '../components/laporan/TableLaporan';
import TableLaporanJenisKelamin from '../components/laporan/TableLaporanJenisKelamin';
import EmptyDataImage from '../assets/images/no_data.svg'
import axios from 'axios'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver';

const Laporan = () => {
  const componentRef = useRef();
  const [informasi, setInformasi] = useState();
  const [tahun, setTahun] = useState();
  const [bulan, setBulan] = useState();
  const [laporan, setLaporan] = useState();
  const today = new Date();
  const EXCEL_TYPE =
    'application/vnd.opencmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';

  const getInformasi = async () => {
    const response = await axios.post(`http://localhost:1337/dashboard`);
    setInformasi(response.data);
  };

  const getData = async () => {
    const data = {
      tahun: tahun ? tahun : today.getFullYear(),
      bulan: bulan
    };

    const response = await axios.post('http://localhost:1337/laporan', data);

    setLaporan(response.data);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const handleExcel = () => {
    // console.log(laporan)
    // console.log(JSON.parse(laporan))
    
    const worksheet = XLSX.utils.json_to_sheet(laporan.jenisKelamin)
    const worksheetJenisKelamin = XLSX.utils.json_to_sheet(laporan.jenisKelamin)
    const worksheetDiagnosaPasien = XLSX.utils.json_to_sheet(filteredDiagnosa)
    const worksheetMetodePembayaran = XLSX.utils.json_to_sheet(laporan.metodePembayaran);
    const worksheetKelompokUsia = XLSX.utils.json_to_sheet(laporan.kelompokUsia)
    const worksheetPasienKecamatan = XLSX.utils.json_to_sheet(laporan.pasienKecamatan)
    const worksheetPasienKelurahan = XLSX.utils.json_to_sheet(laporan.pasienKelurahan)
    const worksheetPasienRumahsakit = XLSX.utils.json_to_sheet(laporan.pasienRumahsakit)
    
    const workbook = {
      Sheets: {
        'Rekapitulasi Jenis Kelamin': worksheetJenisKelamin,
        'Rekapitulasi Diagnosa': worksheetDiagnosaPasien,
        'Rekapitulasi Metode Pembayaran': worksheetMetodePembayaran,
        'Rekapitulasi Kelompok Usia': worksheetKelompokUsia,
        'Rekapitulasi Kecamatan': worksheetPasienKecamatan,
        'Rekapitulasi Kelurahan': worksheetPasienKelurahan,
        'Rekapitulasi Rumahsakit': worksheetPasienRumahsakit
      },
      SheetNames: [
        'Rekapitulasi Jenis Kelamin',
        'Rekapitulasi Diagnosa',
        'Rekapitulasi Metode Pembayaran',
        'Rekapitulasi Kelompok Usia',
        'Rekapitulasi Kecamatan',
        'Rekapitulasi Kelurahan',
        'Rekapitulasi Rumahsakit'
      ]
    };

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})
    saveAsExcel(excelBuffer, bulan ? `laporan_${tahun}_${bulan}` : `laporan_${tahun}`)
  }

  const saveAsExcel = (buffer, fileName) => {
    const data = new Blob([buffer], {type: EXCEL_TYPE})
    saveAs(data, fileName+'_export_'+new Date().getTime()+EXCEL_EXTENSION)
  }

  // Get Basic Informasi
  useEffect(() => {
    getInformasi();
    setTahun(today.getFullYear());
    getData();

    if (!(informasi && laporan)) {
      return <Loader />;
    }
  }, []);

  useEffect(() => {
    getData();

    if (!laporan) {
      return <Loader />;
    }
  }, [tahun, bulan]);

  if (!laporan) {
    return <Loader />;
  }

   const filteredDiagnosa = laporan.pasienDiagnosa.filter((diagnosa) => {
     return !diagnosa._id.includes('benign');
   });

  const mappingData = [
    { title: 'Status Diagnosa', data: laporan.statusDiagnosa },
    { title: 'Diagnosa Pasien', data: filteredDiagnosa },
    { title: 'Metode Pembayaran', data: laporan.metodePembayaran },
    { title: 'Kelompok Usia', data: laporan.kelompokUsia },
    { title: 'pasien Kecamatan', data: laporan.pasienKecamatan },
    { title: 'pasien Kelurahan', data: laporan.pasienKelurahan },
    { title: 'Pasien Rumahsakit', data: laporan.pasienRumahsakit }
  ];

  return (
    <>
      <Helmet>
        <title>
          Laporan | Sistem Informasi Rekapitulasi Penderita Kanker Kota Cimahi
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
            Laporan
          </Typography>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <LaporanFilter
                refreshData={getData}
                getBulan={bulan}
                setBulan={setBulan}
                getTahun={tahun}
                setTahun={setTahun}
              />
            </Grid>
            <React.Fragment>
              {laporan.jenisKelamin.length === 0 ? (
                <Container
                  style={{
                    marginTop: '20px',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h2" style={{ display: 'block' }}>
                    Tidak ada data untuk ditampilkan
                  </Typography>
                  <img
                    src={EmptyDataImage}
                    style={{ maxWidth: '35%', marginTop: '10px' }}
                  />
                </Container>
              ) : (
                <React.Fragment>
                  <Box
                    style={{
                      marginTop: '10px',
                      display: 'inline',
                      marginLeft: 'auto'
                    }}
                  >
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      style={{ marginRight: '15px' }}
                      startIcon={<ExportIcon />}
                      onClick={handlePrint}
                    >
                      Print PDF
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      startIcon={<ExportIcon />}
                      onClick={handleExcel}
                    >
                      Export Data Excel
                    </Button>
                  </Box>
                  <Grid
                    container
                    spacing={4}
                    ref={componentRef}
                    style={{
                      fontSize: '16px',
                      display: 'block',
                      padding: '24px',
                      pageBreakBefore: 'always'
                    }}
                  >
                    <Grid item xs={12}>
                      <TableLaporanJenisKelamin
                        title="Rekapitulasi Berdasarkan Jenis Kelamin"
                        data={laporan.jenisKelamin}
                      />
                    </Grid>
                    {mappingData.map((map, index) => (
                      <Grid item xs={12} key={index}>
                        <TableLaporan title={map.title} data={map.data} />
                      </Grid>
                    ))}
                  </Grid>
                </React.Fragment>
              )}
            </React.Fragment>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Laporan;
