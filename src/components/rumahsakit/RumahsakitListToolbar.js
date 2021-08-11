/* eslint-disable */

import React, {useState} from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Fade,
  Paper
} from '@material-ui/core';
import {
  makeStyles
} from '@material-ui/styles'
import {
  AddRounded as AddIcon
} from '@material-ui/icons'
import FormAddRumahsakit from './FormAddRumahsakit'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const RumahsakitListToolbar = ({refreshData, ...props}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }
  
  return (
    <>
      <Box {...props}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }} ></Box>
        <Box>
          <Card>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ maxWidth: '50vw' }} style={{ flex: 4 }}/>
              <Box style={{ flex: 1 }} />
              <Button
                style={{ flex: 1, marginLeft: 24 }}
                size="small"
                color="primary"
                variant="contained"
                onClick={handleOpen}
                startIcon={<AddIcon />}
              >
                Tambah Rumahsakit
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleOpen}
          closeAfterTransition
        >
          <Fade in={open}>
            <Paper>
              <FormAddRumahsakit
                refreshData={refreshData}
                open={open}
                setOpen={setOpen}
              />
            </Paper>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

export default RumahsakitListToolbar