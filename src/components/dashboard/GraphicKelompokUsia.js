/* eslint-disable */

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core'

const VerticalBar = ({kelompokUsia, props}) => {
    const kelompokName = []
    const kelompokValue = []

    kelompokUsia.map((kelompok) => {
      kelompokName.push(kelompok._id);
      kelompokValue.push(kelompok.count);
    });

    const data = {
      labels: kelompokName,
      datasets: [
        {
          label: 'Jumlah Penderita',
          data: kelompokValue,
          backgroundColor: [
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
          ],
          borderWidth: 1
        }
      ]
    };

    const options = {
      animation: false,
      layout: { padding: 0 },
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
    };
    
    return (
      <Card {...props}>
        <CardHeader title="Jumlah Penderita Berdasarkan Kelompok Usia" />
        <CardContent>
          <Box
            sx={{
              height: 305,
              position: 'relative'
            }}
          >
            <Bar data={data} options={options} />
          </Box>
        </CardContent>
      </Card>
    );
}

export default VerticalBar