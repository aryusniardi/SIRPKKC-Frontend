/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Snackbar,
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Loader from '../loader/loader'
import axios from 'axios'
import * as Yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100% !important',
  }
}));


const AccountProfileDetails = (props) => {
  const modalRef = useRef();
  const classes = useStyles()

  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [success, setSuccess] = useState(false)

  const getProfile = async() => {
    const response = await axios.get(`http://localhost:1337/auth/user/${localStorage.getItem('_id')}`)

    setProfile(response.data.user)
  }
  
  const handleIsLoading = () => setIsLoading(!isLoading)
  
  useEffect(() => {
    getProfile()
  }, [])
  
  if (!profile) {
    return <Loader />
  }

  return (
    <Container style={{ padding: 16, display: 'block' }}>
      <Box>
        <Formik
          initialValues={{
            email: profile.email,
            password: profile.password
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().max(255).required(),
            password: Yup.string().min(8).max(255).required()
          })}
          onSubmit={async ({ email, password }) => {
            const data = {
              email: email,
              password: password,
              rumahsakit: profile.rumahsakit,
              role: profile.role
            };

            handleIsLoading();

            const response = await axios.put(
              `http://localhost:1337/auth/user/${profile._id}`,
              data
            );

            if (response.data.success === 1) {
              setIsLoading(false);
              setSuccess(true);
              setOpenSnackbar(true);
              localStorage.removeItem('email')
              localStorage.setItem('email', response.data.user.email);
              isSubmitting ? handleOpenSuccess() : null;
            } else {
              setSuccess(false);
              setOpenSnackbar(true);
              isSubmitting ? handleOpenSuccess() : null;
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
                      placeholder="Email"
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
                      placeholder="Password"
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
                    <OutlinedInput value={profile.rumahsakit} disabled />
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
                    <OutlinedInput disabled value={profile.role} />
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
                    disabled={isSubmitting || isLoading}
                    type="submit"
                    value="submit"
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

        {isLoading ? <Loader /> : ''}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={success ? 'success' : 'error'}
          >
            {success
              ? 'Data berhasil diperbaharui!'
              : 'Data gagal diperbaharui!'}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AccountProfileDetails;
