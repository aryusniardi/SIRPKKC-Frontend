/* eslint-disable */

import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';

const Account = () => (
  <>
    <Helmet>
      <title>
        Profile | Sistem Informasi Rekapitulasi Penderita Kanker Kota Cimahi
      </title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 4,
        display: 'flex'
      }}
    >
      <Container maxWidth={false}>
        <Typography
          gutterBottom
          style={{
            fontWeight: 700,
            paddingBottom: 16,
            paddingTop: 16,
            fontSize: '1.4rem'
          }}
          color="textPrimary"
        >
          Profile
        </Typography>
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

export default Account;
