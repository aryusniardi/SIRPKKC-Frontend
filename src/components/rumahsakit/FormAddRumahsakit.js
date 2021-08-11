/* eslint-disable */

import React, {useRef, useCallback, useEffect, useState} from 'react';
import {
  Backdrop,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  CircularProgress
} from '@material-ui/core';
import {
    makeStyles
} from '@material-ui/styles'
import {
  LocalHospitalRounded as NameIcon,
  LocationOnRounded as AddressIcon,
  PhoneRounded as PhoneIcon,
  StreetviewRounded as MapIcon
} from '@material-ui/icons'
import { Helmet } from 'react-helmet'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Snackbar from '../../components/snackbar/index'

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
  },
}))

const FormAddRumahsakit = ({ open, setOpen, refreshData, ...rest }) => {
  const modalRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  
  const handleOpenError = () => {
    setOpenError(!openError)
  }

  const handleOpenSuccess = () => {
    setOpenSuccess(!openSuccess);
  }
  
  const handleIsLoading = () => {
    setIsLoading(!isLoading)
  }

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }, [setOpen, open]
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  const classes = useStyles()
  
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <>
      <Helmet>
        <title>
          Tambah Rumahsakit | Sistem Informasi Rekapitulasi Penderita Kanker
          Kota Cimahi
        </title>
      </Helmet>
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
                name: '',
                address: '',
                phone: '',
                map: ''
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required(),
                address: Yup.string().max(255).required(),
                phone: Yup.string()
                  .matches(phoneRegExp, 'Format nomor telepon salah. [0 - 9]')
                  .min(9)
                  .max(16)
                  .required(),
                map: Yup.string().required()
              })}
              onSubmit={async ({ name, address, phone, map }) => {
                handleIsLoading();

                const response = await axios.post(
                  'http://localhost:1337/rumahsakit/',
                  {
                    name,
                    address,
                    phone,
                    map
                  }
                );

                if (response.data.success === 1) {
                  setIsLoading(false);
                  refreshData()
                  setOpen(false)
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
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                  >
                    <Grid item>
                      <FormControl
                        component={Box}
                        marginBottom="1rem!important"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <OutlinedInput
                          disabled={isLoading}
                          placeholder="Masukan nama rumahsakit"
                          autoComplete="off"
                          name="name"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          error={Boolean(touched.name && errors.name)}
                          startAdornment={
                            <InputAdornment position="start">
                              <NameIcon />
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={Boolean(touched.name && errors.name)}
                        >
                          {touched.name && errors.name}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl
                        component={Box}
                        marginBottom="1rem!important"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <OutlinedInput
                          disabled={isLoading}
                          placeholder="Masukan alamat rumahsakit"
                          autoComplete="off"
                          name="address"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          error={Boolean(touched.address && errors.address)}
                          startAdornment={
                            <InputAdornment position="start">
                              <AddressIcon />
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={Boolean(touched.address && errors.address)}
                        >
                          {touched.address && errors.address}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl
                        component={Box}
                        marginBottom="1rem!important"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <OutlinedInput
                          disabled={isLoading}
                          placeholder="Masukan nomor telepon rumahsakit"
                          autoComplete="off"
                          name="phone"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phone}
                          error={Boolean(touched.phone && errors.phone)}
                          startAdornment={
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={Boolean(touched.phone && errors.phone)}
                        >
                          {touched.phone && errors.phone}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl
                        component={Box}
                        marginBottom="1rem!important"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <OutlinedInput
                          disabled={isLoading}
                          placeholder="Masukan map rumahsakit"
                          autoComplete="off"
                          name="map"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.map}
                          error={Boolean(touched.map && errors.map)}
                          startAdornment={
                            <InputAdornment position="start">
                              <MapIcon />
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={Boolean(touched.map && errors.map)}
                        >
                          {touched.map && errors.map
                            ? touched.map && errors.map
                            : 'Salin Kode HTML Lokasi Rumahsakit yang ada pada Google Maps'}
                        </FormHelperText>
                      </FormControl>
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
                        disabled={(isSubmitting || isLoading)}
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

export default FormAddRumahsakit