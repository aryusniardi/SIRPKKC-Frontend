/* eslint-disable */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  },
  table: {
    minWidth: 700
  }
});
const TableLaporanJenisKelamin = ({ title, data }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                align="left"
                style={{ fontSize: '1.2rem', fontWeight: 700 }}
              >
                {title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Keterangan</TableCell>
              <TableCell align="left">Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data._id}>
                <TableCell
                  colSpan={2}
                  style={{
                    textTransform: 'capitalize'
                  }}
                >
                  {data._id}
                </TableCell>
                <TableCell align="left">{data.count}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} style={{ fontWeight: 700 }}>
                Total
              </TableCell>
              <TableCell align="left" style={{ fontWeight: 700 }}>
                {
                    data.reduce((t, kl, i) => t += kl.count, 0)
                }
              </TableCell>
            </TableRow>
            {/* 
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                    )} %`}</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableLaporanJenisKelamin;
