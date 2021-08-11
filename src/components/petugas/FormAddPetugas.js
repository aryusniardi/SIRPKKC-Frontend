/* eslint-disable */

import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Snackbar from '../../components/snackbar/index';

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

const FormAddPetugas = ({ open, setOpen, refreshData, ...rest }) => {
  const modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

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

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  const classes = useStyles();

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
              Form Tambah Petugas
            </Typography>
            <Formik
              initialValues={{
                email: '',
                password: '',
                role: '',
                rumahsakit: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().max(255).required(),
                password: Yup.string().min(8).max(255).required(),
                role: Yup.string().max(255).required(),
                rumahsakit: Yup.string().max(255)
              })}
              onSubmit={async ({ email, password, role, rumahsakit }) => {
                handleIsLoading();

                const response = await axios.post(
                  'http://localhost:1337/auth/user/',
                  {
                      email,
                      password,
                      role,
                      rumahsakit
                  }
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
                          placeholder="Masukan email"
                          autoComplete="off"
                          name="email"
                          type="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                        />
                        <FormHelperText
                          error={Boolean(touched.email && errors.email)}
                        >
                          {touched.email && errors.email}
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
                          placeholder="Masukan Password"
                          name="password"
                          type="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          error={Boolean(touched.password && errors.password)}
                        />
                        <FormHelperText
                          error={Boolean(touched.password && errors.password)}
                        >
                          {touched.password && errors.password}
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
                          placeholder="Masukan Role"
                          autoComplete="off"
                          name="role"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.role}
                          error={Boolean(touched.role && errors.role)}
                        />
                        <FormHelperText
                          error={Boolean(touched.role && errors.role)}
                        >
                          {touched.role && errors.role}
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
                          placeholder="Masukan Nama Rumahsakit"
                          autoComplete="off"
                          name="rumahsakit"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.rumahsakit}
                          error={Boolean(touched.rumahsakit && errors.rumahsakit)}
                        />
                        <FormHelperText
                          error={Boolean(touched.rumahsakit && errors.rumahsakit)}
                        >
                          {touched.rumahsakit && errors.rumahsakit}
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
              message="Petugas telah terdatar"
              condition="error"
            />
            <Snackbar
              openSnackbar={openSuccess}
              setOpenSnackbar={handleOpenSuccess}
              autoHideDuration={3000}
              message="Petugas berhasil didaftarkan"
              condition="success"
            />
          </Box>
        </Container>
      ) : null}
    </>
  );
};

export default FormAddPetugas;