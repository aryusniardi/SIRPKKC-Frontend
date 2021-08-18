/* eslint-disable */

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core'

const GraphBulan = ({data, props}) =>  {
  const months = [
    { id: 'januari', value: 0 },
    { id: 'februari', value: 0 },
    { id: 'maret', value: 0 },
    { id: 'april', value: 0 },
    { id: 'mei', value: 0 },
    { id: 'juni', value: 0 },
    { id: 'juli', value: 0 },
    { id: 'agustus', value: 0 },
    { id: 'september', value: 0 },
    { id: 'oktober', value: 0 },
    { id: 'november', value: 0 },
    { id: 'desember', value: 0 }
  ];
  const forData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  const dataPerBulan = data.sort((a, b) => {
    return months.indexOf(a._id) - months.indexOf(b._id);
  })

  dataPerBulan.map(data => {
    for(let i = 0; i < 12; i++) {
      if (data._id === months[i].id) {
        forData[i] = data.count
      }
    }
  })

  const dataBulan = {
    labels: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ],
    datasets: [
      {
        label: 'Penderita',
        data: forData,
        
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
      <CardHeader title="Jumlah Penderita Berdasarkan Bulan" />
      <CardContent>
        <Box
          sx={{
            height: 305,
            position: 'relative'
          }}
        >
          <Line data={dataBulan} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default GraphBulan;
