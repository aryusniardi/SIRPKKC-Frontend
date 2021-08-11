/* eslint-disable */

import React, {useState} from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import {
    DataGrid,
} from "@material-ui/data-grid";
import axios from 'axios'

const TablePetugas = ({refreshData, petugas}) => {
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [openDialogReset, setOpenDialogReset] = useState(false);

    const resetPetugas = async({_id}) => {
        const response = await axios.put(
          `http://localhost:1337/auth/user/reset/${_id}`
        );

        if (response.data.success === 1) {
          setOpenDialogReset(undefined);
          refreshData();
        } else {
          setOpenDialogReset(undefined);
        }
    }
    
    const deletePetugas = async({_id}) => {
        const response = await axios.delete(`http://localhost:1337/auth/user/${_id}`)

        if (response.data.success === 1) {
            setOpenDialogDelete(undefined);
            refreshData()
        } else {
            setOpenDialogDelete(undefined);
        }
    }
  
    const rows = []
    const columns = [
      { field: 'id', headerName: 'ID', flex: 1 },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1
      },
      {
        field: 'hospital',
        headerName: 'Rumahsakit',
        flex: 1
      },
      {
        field: 'isAdmin',
        headerName: 'Role',
        flex: 1
      },
      {
        field: 'action',
        headerName: 'Actions',
        flex: 2,
        renderCell: (params) => (
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => setOpenDialogReset(params.id)}
            >
              Reset Password
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={() => setOpenDialogDelete(params.id)}
            >
              Delete
            </Button>
          </Box>
        )
      }
    ];

    petugas.users.map(petugas => {
        rows.push({
            id: petugas._id,
            email: petugas.email ? petugas.email : '-',
            hospital: petugas.rumahsakit ? petugas.rumahsakit : '-',
            isAdmin: petugas.role,
        })
    })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
      <Dialog open={!!openDialogReset} onClose={() => setOpenDialogReset(undefined)}>
        <DialogTitle id="alert-dialog-title">
          {'Reset Password Petugas ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin akan mereset password petugas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogReset(undefined)} color="inherit" size="small">
            Batalkan
          </Button>
          <Button
            onClick={async () => {
              resetPetugas({ _id: openDialogReset });
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

      <Dialog open={!!openDialogDelete} onClose={() => setOpenDialogDelete(undefined)}>
        <DialogTitle id="alert-dialog-title">
          {'Hapus Data Petugas ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin akan menghapus petugas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogDelete(undefined)} color="inherit" size="small">
            Batalkan
          </Button>
          <Button
            onClick={async () => {
              deletePetugas({ _id: openDialogDelete });
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
    </div>
  );
}

export default TablePetugas