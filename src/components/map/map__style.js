/* eslint-disable */

import { makeStyles } from '@material-ui/styles'

import { amber, deepOrange, green, grey, lightGreen, lime, orange, red, yellow } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  map: {
    display: 'block',
    maxHeight: '60vh'
  },
  map__svg: {
    display: 'flex',
    margin: 'auto',
    maxHeight: '60vh',
    width: 'auto'
  },
  land__green: {
    fill: green[700],
    fillOpacity: 0.9,
    stroke: grey[50],
    strokeWidth: 2,
    fontSize: 24,
    '&:hover': {
      fill: lightGreen[700],
      transition: 'all .3s ease-in-out'
    }
  },
  land__yellow: {
    fill: yellow[700],
    fillOpacity: 0.9,
    stroke: grey[50],
    strokeWidth: 2,
    fontSize: 24,
    '&:hover': {
      fill: amber[700],
      transition: 'all .3s ease-in-out'
    }
  },
  land__orange: {
    fill: orange[700],
    fillOpacity: 0.9,
    stroke: grey[50],
    strokeWidth: 2,
    fontSize: 24,
    '&:hover': {
      fill: deepOrange[700],
      transition: 'all .3s ease-in-out'
    }
  },
  land__red: {
    fill: red[700],
    fillOpacity: 0.9,
    stroke: grey[50],
    strokeWidth: 2,
    fontSize: 24,
    '&:hover': {
      fill: red[900],
      transition: 'all .3s ease-in-out'
    }
  },
  land__none: {
    opacity: 0,
  },
  paper: {
    padding: '3px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  fixedHeight: {
    height: 245
  },
  text__header: {
    fontWeight: 700,
    textTransform: 'capitalize',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  text__info: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 700,
    textTransform: 'capitalize'
  },
  paper__information: {
    marginTop: '1.5px',
    display: 'flex'
  },
  green: {
    color: green[700],
    marginRight: '1.5px'
  },
  yellow: {
    color: yellow[700],
    marginRight: '1.5px'
  },
  orange: {
    color: orange[700],
    marginRight: '1.5px'
  },
  red: {
    color: red[700],
    marginRight: '1.5px'
  }
}));

export default useStyles