/* eslint-disable */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';

const GraphKelurahan = ({ data, props }) => {
  const values = [];
  const labels = [];

  data.map((data) => {
    values.push(data.count);
    labels.push(
      data._id !== ''
        ? data._id.replace(/\w\S*/g, (w) =>
            w.replace(/^\w/, (c) => c.toUpperCase())
          )
        : 'Unknown'
    );
  });

  const dataKelurahan = {
    labels: labels,
    datasets: [
      {
        label: 'Penderita',
        data: values,
        backgroundColor: [
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)'
        ],
        borderColor: [
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(63, 81, 181, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    legend: {
      display: false
    },
    maintainAspectRatio: false
  };

  return (
    <Card {...props}>
      <CardHeader title="Jumlah Penderita Berdasarkan per Kelurahan" />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Bar data={dataKelurahan} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraphKelurahan;
