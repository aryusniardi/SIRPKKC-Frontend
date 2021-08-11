/* eslint-disable */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  Backdrop,
  Collapse,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  Select,
  FormHelperText,
  CircularProgress,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Snackbar from '../../components/snackbar/index';
import Loader from '../loader/loader'
import { getListKelurahan } from 'src/data/kelurahan';
import { getListKecamatan } from 'src/data/kecamatan';
import { getListDiagnosa } from 'src/data/diagnosa';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100% !important',
    minWidth: '50vw'
  }
}));

const FormAddPasien = ({ open, setOpen, refreshData, ...rest }) => {
  const modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [listKelurahan, setListKelurahan] = useState()
  const [listKecamatan, setListKecamatan] = useState()
  const [listDiagnosa, setListDiagnosa] = useState()

  const bulan = [
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember"
  ]

  const handleOpenError = () => {
    setOpenError(!openError);
  };

  const handleOpenSuccess = () => {
    setOpenSuccess(!openSuccess);
  };

  const handleIsLoading = () => {
    setIsLoading(!isLoading);
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    },
    [setOpen, open]
  );

  const getDataKelurahan = async() => {
      const kel = await getListKelurahan()
      setListKelurahan(kel)
  }

  const getDataKecamatan = async() => {
      const kec = await getListKecamatan()
      setListKecamatan(kec);
  }

  const getDataDiagnosa = async() => {
      const dig = await getListDiagnosa()
      setListDiagnosa(dig)
  }

  useEffect(() => {
    getDataKelurahan()
    getDataKecamatan()
    getDataDiagnosa()

    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  
  const classes = useStyles();
  
  const nikRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  
  if (!(listKecamatan && listKecamatan.kecamatan && listKelurahan && listKelurahan.kelurahan && listDiagnosa && listDiagnosa.diagnosa)) {
      return <Loader />
  }

  const date = new Date()
  const thisMonth = date.getMonth()
  const thisYear = date.getFullYear()

  return (
    <>
      {open ? (
        <Container style={{ padding: 16, display: 'block' }}>
          <Backdrop open={isLoading}>
            <CircularProgress color="primary" />
          </Backdrop>
          <Box>
            <Typography
              variant="h4"
              variant="h4"
              color="textPrimary"
              style={{ paddingBottom: 16 }}
            >
              Form Tambah Rumahsakit
            </Typography>
            <Formik
              initialValues={{
                nik: '',
                name: '',
                address: '',
                kelurahan: '',
                kecamatan: '',
                city: '',
                age: '',
                gender: '',
                diagnose: '',
                additional_diagnose: '',
                status_diagnose: '',
                payment_method: '',
                inputDiagnose: ''
              }}
              validationSchema={Yup.object().shape({
                nik: Yup.string()
                  .matches(nikRegExp, 'Format NIK salah. [0 - 9]')
                  .max(16)
                  .required(),
                name: Yup.string().max(128).required(),
                address: Yup.string().max(1024).required(),
                kelurahan: Yup.string().max(48).required(),
                kecamatan: Yup.string().max(48).required(),
                city: Yup.string().max(48).required(),
                age: Yup.number().min(1).required(),
                gender: Yup.string().max(1).required(),
                diagnose: Yup.string().max(255).required(),
                additional_diagnose: Yup.string().max(255),
                status_diagnose: Yup.string().max(4),
                payment_method: Yup.string().max(4),
                inputDiagnose: Yup.string()
              })}
              onSubmit={async ({ nik, name, address, kelurahan, kecamatan, city, age, gender, diagnose, additional_diagnose, status_diagnose, payment_method, inputDiagnose }) => {
                  const data = {
                    nik: nik,
                    name: name,
                    hospital: localStorage.getItem('rumahsakit'),
                    address: address,
                    kelurahan: kelurahan,
                    kecamatan: kecamatan,
                    city: city,
                    age: age,
                    gender: gender,
                    diagnose:
                      diagnose !== 'none of the above'
                        ? diagnose
                        : inputDiagnose,
                    additional_diagnose: additional_diagnose,
                    status_diagnose: status_diagnose,
                    payment_method: payment_method,
                    month_checkup: bulan[thisMonth],
                    year_checkup: thisYear
                  };

                handleIsLoading();

                const response = await axios.post(
                  'http://localhost:1337/pasien/', data
                );

                if (response.data.success === 1) {
                  setIsLoading(false);
                  refreshData();
                  setOpen(false);
                  isSubmitting ? handleOpenSuccess() : null;
                } else {
                  setIsLoading(false);
                  isSubmitting ? handleOpenError() : null;
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container direction="column" justifyContent="center">
                    <Grid item>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item md={6} sm={12}>
                          <FormControl
                            component={Box}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="nik"
                              error={Boolean(touched.nik && errors.nik)}
                            >
                              NIK
                            </InputLabel>

                            <OutlinedInput
                              disabled={isLoading}
                              placeholder="Masukan Nomor Induk Pasien"
                              autoComplete="off"
                              name="nik"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.nik}
                              error={Boolean(touched.nik && errors.nik)}
                            />
                            <FormHelperText
                              error={Boolean(touched.nik && errors.nik)}
                            >
                              {touched.nik && errors.nik}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={12}>
                          <FormControl
                            component={Box}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="name"
                              error={Boolean(touched.name && errors.name)}
                            >
                              Nama Lengkap
                            </InputLabel>
                            <OutlinedInput
                              disabled={isLoading}
                              placeholder="Masukan Nama Lengkap Pasien"
                              autoComplete="off"
                              name="name"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.name}
                              error={Boolean(touched.name && errors.name)}
                            />
                            <FormHelperText
                              error={Boolean(touched.name && errors.name)}
                            >
                              {touched.name && errors.name}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <FormControl
                        component={Box}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <InputLabel
                          htmlFor="address"
                          error={Boolean(touched.address && errors.address)}
                        >
                          Alamat
                        </InputLabel>
                        <OutlinedInput
                          disabled={isLoading}
                          placeholder="Masukan Alamat Lengkap Pasien"
                          autoComplete="off"
                          label="Alamat"
                          name="address"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          error={Boolean(touched.address && errors.address)}
                        />
                        <FormHelperText
                          error={Boolean(touched.address && errors.address)}
                        >
                          {touched.address && errors.address}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item style={{ paddingTop: '1rem' }}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item xs={4}>
                          <FormControl fullWidth>
                            <InputLabel
                              htmlFor="city"
                              name="city"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.city}
                              error={Boolean(touched.city && errors.city)}
                            >
                              Domisili Kota
                            </InputLabel>
                            <Select
                              native
                              value={values.city}
                              onChange={handleChange}
                              name="city"
                              inputProps={{
                                id: 'city'
                              }}
                            >
                              <option value=""> </option>
                              <option value="cimahi"> Kota Cimahi </option>
                              <option value="luar cimahi">
                                {' '}
                                Luar Kota Cimahi{' '}
                              </option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                          <Collapse in={values.city === 'cimahi'}>
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="kecamatan"
                                error={Boolean(
                                  touched.kecamatan && errors.kecamatan
                                )}
                              >
                                Pilih Kecamatan
                              </InputLabel>
                              <Select
                                native
                                value={values.kecamatan}
                                onChange={handleChange}
                                id="kecamatan"
                                name="kecamatan"
                                inputProps={{
                                  id: 'kecamatan'
                                }}
                              >
                                <option value=""> </option>
                                {listKecamatan.kecamatan.map((kecamatan) => (
                                  <option
                                    key={kecamatan._id}
                                    value={kecamatan.name}
                                  >
                                    {kecamatan.name}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          </Collapse>
                        </Grid>
                        <Grid item xs={4}>
                          <Collapse in={values.kecamatan !== ''}>
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="kelurahan"
                                name="kelurahan"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.kelurahan}
                                error={Boolean(
                                  touched.kelurahan && errors.kelurahan
                                )}
                              >
                                Pilih Kelurahan
                              </InputLabel>
                              <Select
                                native
                                value={values.kelurahan}
                                onChange={handleChange}
                                name="kelurahan"
                                inputProps={{
                                  id: 'kelurahan'
                                }}
                              >
                                <option value=""> </option>
                                {listKelurahan.kelurahan.map((kelurahan) => (
                                  <option
                                    key={kelurahan._id}
                                    value={kelurahan.name}
                                  >
                                    {kelurahan.name}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          </Collapse>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ paddingTop: '1rem' }}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item md={6} sm={12}>
                          <FormControl fullWidth>
                            <InputLabel
                              htmlFor="gender"
                              name="gender"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.gender}
                              error={Boolean(touched.gender && errors.gender)}
                            >
                              Jenis Kelamin
                            </InputLabel>
                            <Select
                              native
                              value={values.gender}
                              onChange={handleChange}
                              name="gender"
                              inputProps={{
                                id: 'gender'
                              }}
                            >
                              <option value=""> </option>
                              <option value="l"> Laki - Laki </option>
                              <option value="p"> Perempuan </option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={12}>
                          <FormControl
                            component={Box}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="age"
                              error={Boolean(touched.age && errors.age)}
                            >
                              Umur
                            </InputLabel>
                            <OutlinedInput
                              disabled={isLoading}
                              placeholder="Masukan Umur Pasien"
                              autoComplete="off"
                              name="age"
                              type="number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.age}
                              error={Boolean(touched.age && errors.age)}
                            />
                            <FormHelperText
                              error={Boolean(touched.age && errors.age)}
                            >
                              {touched.age && errors.age}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item style={{ paddingTop: '1rem' }}>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="diagnose"
                          name="diagnose"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.diagnose}
                          error={Boolean(touched.diagnose && errors.diagnose)}
                        >
                          Diagnosa
                        </InputLabel>
                        <Select
                          native
                          value={values.diagnose}
                          onChange={handleChange}
                          name="diagnose"
                          inputProps={{
                            id: 'diagnose'
                          }}
                        >
                          <option value=""> </option>
                          {listDiagnosa.diagnosa.map((diagnosa) => (
                            <option
                              key={diagnosa._id}
                              value={diagnosa.description}
                            >
                              {diagnosa.name}
                            </option>
                          ))}
                          <option value="none of the above">
                            Pilihan Tidak Ada
                          </option>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Collapse in={values.diagnose === 'none of the above'}>
                      <Grid item style={{ paddingTop: '1rem' }}>
                        <FormControl
                          component={Box}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel
                            htmlFor="inputDiagnose"
                            error={Boolean(
                              touched.inputDiagnose && errors.inputDiagnose
                            )}
                          >
                            Input Diagnosa
                          </InputLabel>
                          <OutlinedInput
                            disabled={isLoading}
                            placeholder="Masukan Diagnosa"
                            autoComplete="off"
                            name="inputDiagnose"
                            type="text"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.inputDiagnose}
                            error={Boolean(
                              touched.inputDiagnose && errors.inputDiagnose
                            )}
                          />
                          <FormHelperText
                            error={Boolean(
                              touched.inputDiagnose && errors.inputDiagnose
                            )}
                          >
                            {touched.inputDiagnose && errors.inputDiagnose}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Collapse>
                    <Grid item>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item md={6} sm={12}>
                          <FormControl
                            component={Box}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="additional_diagnose"
                              error={Boolean(
                                touched.additional_diagnose &&
                                  errors.additional_diagnose
                              )}
                            >
                              Diagnosa Tambahan
                            </InputLabel>

                            <OutlinedInput
                              disabled={isLoading}
                              placeholder="Masukan Diagnosa Tambahan"
                              autoComplete="off"
                              name="additional_diagnose"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.additional_diagnose}
                              error={Boolean(
                                touched.additional_diagnose &&
                                  errors.additional_diagnose
                              )}
                            />
                            <FormHelperText
                              error={Boolean(
                                touched.additional_diagnose &&
                                  errors.additional_diagnose
                              )}
                            >
                              {touched.additional_diagnose &&
                                errors.additional_diagnose}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} sm={12}>
                          <FormControl fullWidth>
                            <InputLabel
                              htmlFor="status_diagnose"
                              name="status_diagnose"
                              type="text"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.status_diagnose}
                              error={Boolean(
                                touched.status_diagnose &&
                                  errors.status_diagnose
                              )}
                            >
                              Status Diagnosa
                            </InputLabel>
                            <Select
                              native
                              value={values.status_diagnose}
                              onChange={handleChange}
                              name="status_diagnose"
                              inputProps={{
                                id: 'status_diagnose'
                              }}
                            >
                              <option value=""> </option>
                              <option value="baru"> Baru </option>
                              <option value="lama"> Lama </option>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="payment_method"
                          name="payment_method"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.payment_method}
                          error={Boolean(
                            touched.payment_method && errors.payment_method
                          )}
                        >
                          Metode Pembayaran
                        </InputLabel>
                        <Select
                          native
                          value={values.payment_method}
                          onChange={handleChange}
                          name="payment_method"
                          inputProps={{
                            id: 'payment_method'
                          }}
                        >
                          <option value=""> </option>
                          <option value="umum"> Umum </option>
                          <option value="bpjs"> BPJS </option>
                        </Select>
                      </FormControl>
                      <FormHelperText
                        error={Boolean(
                          touched.payment_method && errors.payment_method
                        )}
                      >
                        {touched.payment_method && errors.payment_method ? touched.hospital && errors.hospital : "*Umum untuk pembayaran diluar BPJS"}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{ marginTop: 8 }}
                  >
                    <Grid item mx={1}>
                      <Button
                        disabled={isLoading}
                        color="inherit"
                        size="small"
                        onClick={() => setOpen(false)}
                        ref={modalRef}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item mx={1}>
                      <Button
                        disabled={isSubmitting || isLoading}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        ref={modalRef}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
            <Snackbar
              openSnackbar={openError}
              setOpenSnackbar={handleOpenError}
              autoHideDuration={3000}
              message="Rumahsakit telah terdatar"
              condition="error"
            />
            <Snackbar
              openSnackbar={openSuccess}
              setOpenSnackbar={handleOpenSuccess}
              autoHideDuration={3000}
              message="Rumahsakit berhasil didaftarkan"
              condition="success"
            />
          </Box>
        </Container>
      ) : null}
    </>
  );
};

export default FormAddPasien;
