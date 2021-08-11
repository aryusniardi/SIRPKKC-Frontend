/* eslint-disable */

import React from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/styles'

const DashboardCard = ({ Icon, itemColor, title, text }) => {
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card sx={{ height: '100%' }} style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CardContent padding="0px" style={{width: '100%'}}>
        <Typography style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          {Icon}
        </Typography>
        <Box mx={1}>
          <Typography color="textSecondary" gutterBottom variant="subtitle2">
            {title}
          </Typography>
          <Typography
            style={{ color: itemColor, WebkitLineClamp: 2, textTransform: 'uppercase', fontSize: small ? '1rem' : '1.4rem' }}
            variant="h6"
            fontWeight={700}
          >
            {text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DashboardCard