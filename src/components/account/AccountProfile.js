/* eslint-disable */

import React from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography
} from '@material-ui/core';

const AccountProfile = (props) => {
  return (
    <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          sx={{
            height: 100,
            width: 100,
          }}
          style={{
            fontSize: '4rem'
          }}
        >{
          localStorage.getItem('email').charAt(0).toUpperCase()
        }</Avatar>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
          style={{
            marginTop: 20,
            textTransform: 'uppercase'
          }}
        >
          {localStorage.getItem('email')}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          style={{
            textTransform: 'uppercase'
          }}
        >
          {localStorage.getItem('rumahsakit')}
        </Typography>
        <Chip size="medium" variant="outlined" color="primary" label={localStorage.getItem('role').toUpperCase()} style={{marginTop: '10px'}} />
      </Box>
    </CardContent>
  </Card>
  )
} 

export default AccountProfile;
