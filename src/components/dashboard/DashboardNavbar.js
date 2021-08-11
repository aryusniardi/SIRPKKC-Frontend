/* eslint-disable */

import React, {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu, 
  MenuItem,
  Link,
  ListItemIcon,
  ListItemText,
  useMediaQuery 
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  AccountCircleRounded as AccountIcon,
  PersonRounded as UserIcon,
  ExitToAppRounded as LogoutIcon
} from '@material-ui/icons';
import Logo from '../../components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
    backgroundColor: '#f8f9fe'
  },
  toolbarLink: {
    marginLeft: '.5rem',
    marginRight: '.5rem',
    padding: '.5rem',
    cursor: 'pointer',
    flexShrink: 0,
    color: '#a0aec0 !important',
    textDecoration: 'none !important',
    wordSpacing: '1px'
  }
}));

const DashboardNavbar = ({ ...rest}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const sections = [
    { title: 'Dashboard', url: '/' },
    { title: 'Daftar Rumahsakit', url: 'rumahsakit' },
  ];

  const rumahsakitSections = [{ title: 'Daftar Pasien', url: 'pasien' }];

  const adminSections = [
    { title: 'Daftar Pasien', url: 'pasien' },
    { title: 'Daftar Petugas', url: 'petugas' },
    { title: 'Laporan', url: 'laporan' }
  ];

  const theme = useTheme() 
  const small = useMediaQuery(theme.breakpoints.down('sm'))
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenAnchorEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseAnchorEl = () => {
    setAnchorEl(null)
  }

  const handleAccount = () => {
    navigate('/account', {replace: true})
  }

  const handleSignout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('_id')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    localStorage.removeItem('rumahsakit');

    navigate('/login')
  }
  
  return (
    <AppBar position="absolute" className={classes.appBar} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            alignContent="center"
            alignItems="center"
          >
            <Logo style={{ padding: 4 }} />
            <Box ml={2}>
              <Typography
                color="white"
                fontWeight={700}
                letterSpacing={0.4}
                style={{
                  fontSize: small ? '1rem' : '1.2rem',
                  color: 'white',
                  paddingTop: '3px',
                  paddingBottom: 'none',
                  marginBottom: '0px !important',
                  maxWidth: '35vw',
                  inlineSize: 'max-content'
                }}
              >
                Sistem Informasi Rekapitulasi Penderita Kanker
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                color="white"
                fontWeight={400}
                letterSpacing={0.4}
                style={{
                  fontSize: '1rem',
                  color: 'white'
                }}
              >
                Kota Cimahi
              </Typography>
            </Box>
          </Box>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {!localStorage.getItem('email') ? (
          <Box>
            <Button
              color="inherit"
              variant="outlined"
              size="small"
              onClick={() => {
                navigate('/login')
              }}
            >
              Login
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="title">{small ? '' : 'Hallo,'}</Typography>
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              endIcon={<AccountIcon />}
              onClick={handleOpenAnchorEl}
            >
              {/* {small ? '' : localStorage.getItem('email')} */}
              <span>{localStorage.getItem('email')}</span>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseAnchorEl}
            >
              <MenuItem onClick={handleAccount}>
                <ListItemIcon>
                  {' '}
                  <UserIcon />{' '}
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleSignout}>
                <ListItemIcon>
                  {' '}
                  <LogoutIcon />{' '}
                </ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
        {localStorage.getItem('rumahsakit')
          ? rumahsakitSections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                className={classes.toolbarLink}
              >
                {section.title}
              </Link>
            ))
          : ''}
        {localStorage.getItem('role') === 'super admin'
          ? adminSections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                className={classes.toolbarLink}
              >
                {section.title}
              </Link>
            ))
          : ''}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
