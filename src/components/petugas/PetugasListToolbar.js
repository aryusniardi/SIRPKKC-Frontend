/* eslint-disable */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Modal,
  Fade,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AddRounded as AddIcon } from '@material-ui/icons';
import FormAddPetugas from './FormAddPetugas';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const PetugasListToolbar = ({ refreshData, ...props }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3
        }}
      ></Box>
      <Box>
        <Card>
          <CardContent
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ maxWidth: '50vw' }} style={{ flex: 4 }} />
            <Box style={{ flex: 1 }} />
            <Button
              style={{ flex: 1, marginLeft: 24 }}
              size="small"
              color="primary"
              variant="contained"
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Tambah Petugas
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
            <FormAddPetugas
              refreshData={refreshData}
              open={open}
              setOpen={setOpen}
            />
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PetugasListToolbar;
