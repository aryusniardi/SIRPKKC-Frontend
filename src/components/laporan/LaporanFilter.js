/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Box,
    Grid,
    Typography,
    FormControl,
    OutlinedInput,
    Select,
    FormHelperText,
    InputLabel
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from '../loader/loader'

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

const LaporanFilter = ({ getBulan, setBulan, getTahun, setTahun, refreshData}) => {
    const classes = useStyles()
    const today = new Date()
    
    const month = [
        'januari',
        'februari',
        'maret',
        'april',
        'mei',
        'juni',
        'juli',
        'agustus',
        'september',
        'oktober',
        'november',
        'desember'
    ];

    const [bulan, setupBulan] = useState()
    const [tahun, setupTahun] = useState()

    const handleTahun = (value) => {
      setTahun(value)
      setupTahun(value)
      setBulan('')
    }
    const handleBulan = (value) => {
      setBulan(value)
      setupBulan(value)
    }

    useEffect(() => {
      e => e.preventDefault()
        refreshData()
    }, [tahun, bulan])

  return (
    <React.Fragment>
      <Box>
        <Typography
          variant="h4"
          variant="h4"
          color="textPrimary"
          style={{ paddingBottom: 16 }}
        >
          Pilih Data
        </Typography>
        <Formik
          initialValues={{
            bulan: '',
            tahun: today.getFullYear(),
          }}
          validationSchema={Yup.object().shape({
            bulan: Yup.string(),
            tahun: Yup.number().min(1),
          })}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => (
            <form className={classes.form}>
              <Grid container direction="column" justifyContent="center">
                <Grid item style={{ paddingTop: '1rem' }}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="tahun"
                          error={Boolean(touched.tahun && errors.tahun)}
                        >
                          Masukan Tahun
                        </InputLabel>
                        <OutlinedInput
                          autoComplete="off"
                          name="tahun"
                          type="number"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            handleTahun(e.target.value)
                            handleBulan('')
                          }}
                          value={values.tahun}
                          error={Boolean(touched.tahun && errors.tahun)}
                        />
                        <FormHelperText
                          error={Boolean(touched.tahun && errors.tahun)}
                        >
                          {touched.tahun && errors.tahun}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="bulan"
                          error={Boolean(touched.bulan && errors.bulan)}
                        >
                          Pilih Bulan
                        </InputLabel>
                        <Select
                          native
                          value={values.bulan}
                          onChange={(e) => {
                            handleChange(e);
                            handleBulan(e.target.value)
                          }}
                          id="bulan"
                          name="bulan"
                          inputProps={{
                            id: 'bulan'
                          }}
                        >
                          <option value=""> </option>
                          {month.map((month) => (
                            <option
                              key={month}
                              value={month}
                              style={{ textTransform: 'capitalize' }}
                            >
                              {month}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  );
};


export default LaporanFilter