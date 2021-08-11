/* eslint-disable */

import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Typography,
  Tooltip
} from '@material-ui/core'
import { FiberManualRecordRounded } from '@material-ui/icons'
import kelurahan from '..//map/data';
import useStyles from '../map/map__style';

const MapKotaCimahi = ({ data, kecamatan, props}) => {
  const classes = useStyles();

  const kec = kecamatan !== '' ? kecamatan : ''

  const renderSwitch = (name) => {
    const i = getCount(name);
    if (i < 10) {
      return classes.land__green;
    } else if (i >= 10 && i < 15) {
      return classes.land__yellow;
    } else if (i >= 15 && i < 25) {
      return classes.land__orange;
    } else if (i >= 25) {
      return classes.land__red;
    } else {
      return classes.land__none
    }
  };

  const getCount = (kelurahan) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === kelurahan) {
        return data[i].count;
      }
    }
  }

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardHeader title="Peta Sebaran Kanker di Kota Cimahi" />
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={3} md={3} lg={2}>
            <h5 style={{textTransform: 'capitalize'}}>
              Keterangan warna
            </h5>
            <div className={classes.paper__information}>
              <FiberManualRecordRounded className={classes.green} />
              <Typography> {`<`} 9</Typography>
            </div>
            <div className={classes.paper__information}>
              <FiberManualRecordRounded className={classes.yellow} />
              <Typography>10 - 14</Typography>
            </div>
            <div className={classes.paper__information}>
              <FiberManualRecordRounded className={classes.orange} />
              <Typography>15 - 24</Typography>
            </div>
            <div className={classes.paper__information}>
              <FiberManualRecordRounded className={classes.red} />
              <Typography> {'>'} 25</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} lg={10}>
            <div className={classes.map}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="1 1 1000 1000"
                className={classes.map__svg}
                xmlSpace="preserve"
              >
                {kelurahan.map((kelurahan) => ( 
                  <React.Fragment key={kelurahan._id}>
                      <Tooltip
                        key={kelurahan._id}
                        placement="top"
                        title={
                          <React.Fragment>
                            <Typography style={{color: 'white', textTransform: 'capitalize'}}>
                              Kelurahan {kelurahan.nama}
                            </Typography>
                            <Typography variant="body2">
                              Total Penderita: <b>{getCount(kelurahan.nama)}</b>
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <Button
                          key={kelurahan._id}
                          href={'#'}
                          className={renderSwitch(kelurahan.nama)}
                          disabled={kec !== '' ? kelurahan.kecamatan !== kec : false}
                        >
                          {kec !== '' ? kelurahan.kecamatan === kec ? kelurahan.component : '' : kelurahan.component}
                        </Button>
                      </Tooltip>
                    </React.Fragment>
                ))}
              </svg>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MapKotaCimahi