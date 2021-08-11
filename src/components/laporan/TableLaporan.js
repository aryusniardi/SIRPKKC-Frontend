/* eslint-disable */

import React from 'react';
import { makeStyles,  } from '@material-ui/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 700
  }
});

const TableLaporan = ({title, data}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={4}
                align="left"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}
              >
                Rekapitulasi Berdasarkan {title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Keterangan</TableCell>
              <TableCell align="left">Laki-Laki</TableCell>
              <TableCell align="left">Perempuan</TableCell>
              <TableCell align="left">Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow hover key={data._id}>
                <TableCell style={{ textTransform: 'uppercase' }}>
                  {data._id ? data._id : 'Tidak di ketahui'}
                </TableCell>
                <TableCell align="left">{data.laki_laki}</TableCell>
                <TableCell align="left">{data.perempuan}</TableCell>
                <TableCell align="left" style={{ fontWeight: 700 }}>
                  {data.laki_laki + data.perempuan}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell align="center" colSpan={2} style={{ fontWeight: 700 }}>
                Total
              </TableCell>
              <TableCell align="left" style={{ fontWeight: 700 }}>
                {data.reduce((t, kl, i) => (t += kl.count), 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TableLaporan