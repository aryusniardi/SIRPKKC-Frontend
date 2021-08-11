/* eslint-disable */

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  Alert, 
  Button,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Grid,
  Typography,
  Snackbar,
  Modal,
  Paper,
  Fade
} from '@material-ui/core';
import {
  makeStyles
} from '@material-ui/styles'
import {
  Call,
  CreateRounded,
  DeleteRounded
} from '@material-ui/icons'
// import Snackbar from '../snackbar/index'
import axios from 'axios'
import FormEditRumahsakit from './FormEditRumahsakit';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const RumahsakitCard = ({ rs, refreshData, ...rest }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const handleOpenSnackbar = () => {
    setOpenSnackbar(!openSnackbar)
  }

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleOpen = () => setOpen(!open)

  const deleteRumahsakit = async ({_id}) => {    
    const response = await axios.delete(`http://localhost:1337/rumahsakit/${_id}`)
    
    if (response.data.success === 1) {
      handleOpenDialog()
      handleOpenSnackbar()
      refreshData()
    } else {
      handleOpenSnackbar({success: false})     
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <iframe
            src={rs.map}
            frameBorder="0"
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            style={{ width: '100%' }}
          />
        </Box>
        <Typography
          align="left"
          color="TextPrimary"
          gutterBottom
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: 700 }}
          placeholder="example@email.com"
        >
          {rs.name}
        </Typography>
        <Typography align="left" color="TextSecondary" variant="body1">
          {rs.address}
        </Typography>
        <Grid
          item
          sx={{
            paddingTop: 1,
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Call color="action" />
          <Typography
            align="left"
            color="textPrimary"
            variant="body1"
            display="inline"
            sx={{ pl: 1 }}
          >
            {rs.phone}
          </Typography>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      {localStorage.getItem('role') === 'super admin' ||
      (localStorage.getItem('rumahsakit') &&
        localStorage.getItem('rumahsakit') === rs.name) ? (
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Button
                color="error"
                size="small"
                startIcon={<DeleteRounded />}
                onClick={handleOpenDialog}
              >
                Delete
              </Button>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<CreateRounded />}
                onClick={handleOpen}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        ''
      )}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleOpen}
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper>
            <FormEditRumahsakit
              refreshData={refreshData}
              open={open}
              setOpen={setOpen}
              rumahsakit={rs}
            />
          </Paper>
        </Fade>
      </Modal>
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle id="alert-dialog-title">
          {'Hapus Data Rumahsakit ' + rs.name + '?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin akan menghapus data {rs.name.toUpperCase()}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog} color="inherit" size="small">
            Batalkan
          </Button>
          <Button
            onClick={async () => {
              deleteRumahsakit({ _id: rs._id });
            }}
            autoFocus
            variant="outlined"
            size="small"
            color="error"
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>
      {openSnackbar ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleOpenSnackbar}
        >
          <Alert onClose={handleOpenSnackbar} severity="success">
            Data rumahsakit {rs.name} telah berhasil dihapus
          </Alert>
        </Snackbar>
      ) : null}
    </Card>
  );
}

RumahsakitCard.propTypes = {
  rs: PropTypes.object.isRequired
}

export default RumahsakitCard;
