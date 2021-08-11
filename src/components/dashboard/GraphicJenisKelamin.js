/* eslint-disable */

import { Doughnut } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import {
  FiberManualRecordRounded as RoundIcon,
} from '@material-ui/icons';

const GraphicJenisKelamin = ({lakilaki, perempuan, props}) => {
  const theme = useTheme()
  const totalPenderita = lakilaki+perempuan
  
  const data = {
    datasets: [
      {
        data: [lakilaki, perempuan],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Laki - Laki', 'Perempuan']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const jenisKelamin = [
    {
      title: 'Laki - Laki',
      value: lakilaki,
      icon: RoundIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Perempuan',
      value: perempuan,
      icon: RoundIcon,
      color: colors.red[600]
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Jumlah Penderita Berdasarkan Jenis Kelamin" />
      <CardContent>
        <Box
          sx={{
            height: 200,
            position: 'relative'
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {jenisKelamin.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon style={{ color: color }} />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {((value / totalPenderita) * 100).toString().substring(0, 4)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraphicJenisKelamin;
