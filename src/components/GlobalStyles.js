/* eslint-disable */

import { createStyles, makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f7fafc',
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.MuiCard-root': {
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%) !important',
      borderRadius: '0.5rem !important'
    },
    '.MuiPaper-root': {
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%) !important'
    }
  }
});

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles