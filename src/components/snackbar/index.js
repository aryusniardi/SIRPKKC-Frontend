/* eslint-disable */

import React, {useRef, useCallback, useEffect} from 'react'
import {
    Snackbar,
    Alert
} from '@material-ui/core'

const index = ({ message, condition, openSnackbar, setOpenSnackbar }) => {
  const modalRef = useRef();

  const handleClose = (e) => {
    setOpenSnackbar(false);
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && openSnackbar) {
        setOpenSnackbar(false);
      }
    }, [setOpenSnackbar, openSnackbar]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);


  return (
    <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={condition}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default index