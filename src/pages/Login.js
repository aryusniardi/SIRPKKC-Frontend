/* eslint-disable */

import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  OutlinedInput,
  FormControl,
  InputAdornment,
  Grid,
  Snackbar,
  Typography,
  IconButton,
  FormHelperText
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/styles'
import {
  EmailRounded as Email,
  LockRounded as Password,
  VisibilityRounded as Visibility,
  VisibilityOffRounded as VisibilityOff
} from '@material-ui/icons'
import componentStyles from '../assets/theme/views/auth/login'
import axios from 'axios';
import themeColors from '../assets/theme/colors';
import LogoKemenkes from '../assets/images/logo-kemenkes.jpg';
import LogoDinkes from '../assets/images/dinkes-cimahi-logo.png';

const useStyles = makeStyles(componentStyles);

const Login = () => {
  const navigate = useNavigate()
  const classes = useStyles()

  if (localStorage.getItem('email')) {
    navigate('/');
  }

  const [showPassword, setShowPassword] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSnackbar = () => {
    setOpenSnackbar(!openSnackbar)
  }
  
  return (
    <>
      <Helmet>
        <title>
          Login | Sistem Informasi Rekapitulasi Penderita Kanker Kota Cimahi{' '}
        </title>
      </Helmet>
      <Container
        style={{
          height: '100vh',
          minWidth: '100vw',
          display: 'flex',
          background: `url('https://images.pexels.com/photos/7130503/pexels-photo-7130503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} lg={5} md={7} style={{ padding: 24}}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                className={classes.cardHeader}
                style={{ paddingBottom: 0 }}
                title={
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignSelf: 'center'
                      }}
                    >
                      <img
                        src={LogoKemenkes}
                        style={{
                          height: '8vw'
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      style={{
                        display: 'flex',
                        alignSelf: 'center'
                      }}
                    >
                      <img
                        src={LogoDinkes}
                        style={{
                          height: '8vh'
                        }}
                      />
                    </Grid>
                  </Grid>
                }
                titleTypographyProps={{
                  component: Box,
                  textAlign: 'center',
                  marginBottom: '1rem!important',
                  marginTop: '.5rem!important',
                  fontSize: '1rem!important'
                }}
              />
              <CardContent classes={{ root: classes.cardContent }}>
                <Box
                  color={themeColors.gray[600]}
                  textAlign="center"
                  marginTop=".5rem"
                  marginBottom="2rem"
                  fontSize="1rem"
                >
                  <Box component="small">
                    <Typography
                      variant="h4"
                      component="h4"
                      color="CaptionText"
                      textAlign="left"
                      fontWeight={700}
                    >
                      Selamat Datang,
                    </Typography>
                    <Typography
                      variant="h4"
                      component="h4"
                      color="CaptionText"
                      textAlign="left"
                      fontWeight={300}
                    >
                      Sign In untuk melanjutkan...
                    </Typography>
                  </Box>
                </Box>

                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email().max(255).required(),
                    password: Yup.string()
                      .min(6)
                      .required()
                  })}
                  onSubmit={async ({ email, password }) => {
                    const response = await axios.post(
                      'http://localhost:1337/auth/signin',
                      { email, password }
                    );

                    if (response.data) {
                      if (response.data.success == 1) {
                        setLoginSuccess(true);
                        localStorage.removeItem('user');
                        localStorage.setItem('_id', response.data.data._id);
                        localStorage.setItem('email', response.data.data.email);
                        localStorage.setItem('role', response.data.data.role);
                        localStorage.setItem(
                          'rumahsakit',
                          response.data.data.rumahsakit
                        );

                        navigate('/', { replace: true });
                      } else {
                        setOpenSnackbar(true);
                      }
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
                    <form onSubmit={handleSubmit}>
                      <FormControl
                        component={Box}
                        marginBottom="1rem!important"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <OutlinedInput
                          placeholder="example@email.com"
                          autoComplete="off"
                          name="email"
                          type="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          error={Boolean(touched.email && errors.email)}
                          startAdornment={
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={Boolean(touched.email && errors.email)}
                        >
                          {touched.email && errors.email}
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        component={Box}
                        marginBottom="1rem!important"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      >
                        <OutlinedInput
                          autoComplete="off"
                          type="password"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          error={Boolean(touched.password && errors.password)}
                          placeholder="Password"
                          startAdornment={
                            <InputAdornment position="start">
                              <Password />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                  ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          error={Boolean(touched.password && errors.password)}
                        >
                          {touched.password && errors.password}
                        </FormHelperText>
                      </FormControl>

                      <Box sx={{ py: 2 }} textAlign="center">
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Sign in
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbar}
        >
          {loginSuccess == true ? (
            <Alert onClose={handleSnackbar} variant="filled" severity="success">
              Sign in berhasil
            </Alert>
          ) : (
            <Alert onClose={handleSnackbar} variant="filled" severity="error">
              Email atau Password salah
            </Alert>
          )}
        </Snackbar>
      </Container>
    </>
  );
}

export default Login;
