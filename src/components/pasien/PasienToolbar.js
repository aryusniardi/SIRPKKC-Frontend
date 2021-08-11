/* eslint-disable */
import React, {useState} from 'react'
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
import {makeStyles} from '@material-ui/styles'
import {
  SearchRounded as SearchIcon,
  AddRounded as AddIcon
} from '@material-ui/icons'
import FormAddPasien from './FormAddPasien'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll', 
  }
}));

const PasienToolbar = ({refreshData, keyword, setKeyword,...props}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleChange= (value) => {
    setKeyword(value)
  }
  
  const handleOpen = () => {
    setOpen(!open)
  }
  
  return (
    <Box {...props}>
      <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }} ></Box>
      <Box>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ maxWidth: '50vw' }} style={{flex: 4}}>
              <TextField
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search pasien"
                variant="outlined"
                onChange={(e) => handleChange(e.target.value)}
              />
            </Box>
            <Box style={{flex: 1}} />
            {localStorage.getItem('role') !== 'super admin' 
            ? <Button
                style={{flex: 1, marginLeft: 24}}
                size="small"
                color="primary"
                variant="contained"
                onClick={handleOpen}
                startIcon={<AddIcon />}
              >
                Tambah Pasien
              </Button>
              : ''
            }
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
          <Paper style={{ maxHeight: '75vh', overflow: 'scroll' }}>
            <FormAddPasien
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

export default PasienToolbar;
