/* eslint-disable */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Collapse,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from '../loader/loader'
import {getListRumahsakit} from '../../data/rumahsakit'
import { getListKelurahan } from 'src/data/kelurahan';
import { getListKecamatan } from 'src/data/kecamatan';

const DashboardListToolbar = ({tahun, setTahun, wilayah, setWilayah, pilihan, setPilihan, refreshData, ...props}) => {
  const [rumahsakit, setRumahsakit] = useState()
  const [kelurahan, setKelurahan] = useState()
  const [kecamatan, setKecamatan] = useState()
  const [pilih, setPilih] = useState()
  const [daerah, setDaerah] = useState()
  const [year, setYear] = useState()

  const handleTahun = (value) => {
    setTahun(value)
    setYear(value)
  }
  
  const handlePilih = (value) => {
    setWilayah(value)
    setPilihan('')
  }

  const handleDaerah = (value) => {
    setPilihan(value)
    setDaerah(value)
  }
  
  const getRumahsakit = async() => {
    const rs = await getListRumahsakit()
    setRumahsakit(rs)
  }

  const getKelurahan = async() => {
    const kel = await getListKelurahan()
    setKelurahan(kel)
  }

  const getKecamatan = async() => {
    const kec = await getListKecamatan()
    setKecamatan(kec)
  }
  
  useEffect(() => {
    getRumahsakit()
    getKelurahan()
    getKecamatan()
  }, []);

  useEffect(() => {
    e => e.preventDefault()
    refreshData();
  }, [pilih, daerah, year]);

  

  if (!(rumahsakit && rumahsakit.rumahsakit && kelurahan && kelurahan.kelurahan && kecamatan && kecamatan.kecamatan)) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <Card>
          <CardHeader title="Pilih Data" />
          <CardContent>
            <Formik
              initialValues={{
                tahun: 2020,
                jenis: '',
                kecamatan: '',
                kelurahan: '',
                rumahsakit: ''
              }}
              validationSchema={Yup.object().shape({
                tahun: Yup.number(),
                jenis: Yup.string(),
                kecamatan: Yup.string(),
                kelurahan: Yup.string()
              })}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    component={Box}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  >
                    <InputLabel
                      htmlFor="tahun"
                      error={Boolean(touched.tahun && errors.tahun)}
                    >
                      Pilih Tahun
                    </InputLabel>

                    <OutlinedInput
                      name="tahun"
                      type="number"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e)
                        handleTahun(e.target.value)
                      }}
                      value={values.tahun}
                      error={Boolean(touched.tahun && errors.tahun)}
                    />
                    <FormHelperText error={Boolean(touched.tahun && errors.tahun)}>
                      {touched.tahun && errors.tahun}
                    </FormHelperText>
                  </FormControl>
                  <FormControl fullWidth margin="dense">
                    <InputLabel
                      htmlFor="jenis"
                      name="jenis"
                      type="text"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        handlePilih(e.target.value);
                      }}
                      value={values.jenis}
                      error={Boolean(touched.kecamatan && errors.kecamatan)}
                    >
                      Kecamatan / Kelurahan / Rumahsakit
                    </InputLabel>
                    <Select
                      native
                      value={values.jenis}
                      onChange={(e) => {
                        handleChange(e);
                        handlePilih(e.target.value);
                      }}
                      name="jenis"
                      inputProps={{
                        id: 'jenis'
                      }}
                    >
                      <option value=""> </option>
                      <option value="rumahsakit"> Rumahsakit </option>
                      <option value="kelurahan"> Kelurahan </option>
                      <option value="kecamatan"> Kecamatan </option>
                    </Select>
                  </FormControl>
                  <Collapse in={values.jenis}>
                    {values.jenis === 'kecamatan' ? (
                      <FormControl fullWidth margin="normal">
                        <InputLabel
                          htmlFor="pilihKecamatan"
                          name="kecamatan"
                          type="text"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            handleDaerah(e.target.value);
                          }}
                          value={values.kecamatan}
                          error={Boolean(touched.kecamatan && errors.kecamatan)}
                        >
                          Pilih Kecamatan
                        </InputLabel>
                        <Select
                          native
                          value={values.kecamatan}
                          onChange={(e) => {
                            handleChange(e);
                            handleDaerah(e.target.value);
                          }}
                          name="kecamatan"
                          inputProps={{
                            id: 'pilihKecamatan'
                          }}
                        >
                          <option value=""> </option>
                          {kecamatan.kecamatan.map((kecamatan) => (
                            <option key={kecamatan._id} value={kecamatan.name}>
                              {kecamatan.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    ) : values.jenis === 'kelurahan' ? (
                      <FormControl fullWidth margin="normal">
                        <InputLabel
                          htmlFor="pilihKelurahan"
                          name="kelurahan"
                          type="text"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            handleDaerah(e.target.value);
                          }}
                          value={values.kelurahan}
                          error={Boolean(touched.kelurahan && errors.kelurahan)}
                        >
                          Pilih Kelurahan
                        </InputLabel>
                        <Select
                          native
                          value={values.kelurahan}
                          onChange={(e) => {
                            handleChange(e);
                            handleDaerah(e.target.value);
                          }}
                          name="kelurahan"
                          inputProps={{
                            id: 'pilihKelurahan'
                          }}
                        >
                          <option value=""> </option>
                          {kelurahan.kelurahan.map((kelurahan) => (
                            <option key={kelurahan._id} value={kelurahan.name}>
                              {kelurahan.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <FormControl fullWidth margin="normal">
                        <InputLabel
                          htmlFor="pilihRumahsakit"
                          name="rumahsakit"
                          type="text"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            handleDaerah(e.target.value);
                          }}
                          value={values.rumahsakit}
                          error={Boolean(
                            touched.rumahsakit && errors.rumahsakit
                          )}
                        >
                          Pilih Rumahsakit
                        </InputLabel>
                        <Select
                          native
                          value={values.rumahsakit}
                          onChange={(e) => {
                            handleChange(e);
                            handleDaerah(e.target.value);
                          }}
                          name="rumahsakit"
                          inputProps={{
                            id: 'pilihRumahsakit'
                          }}
                        >
                          <option value=""> </option>
                          {rumahsakit.rumahsakit.map((rs) => (
                            <option key={rs._id} value={rs.name}>
                              {rs.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Collapse>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DashboardListToolbar;