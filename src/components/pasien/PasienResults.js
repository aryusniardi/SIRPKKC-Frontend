/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableSortLabel,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Modal,
  Fade,
} from '@material-ui/core';
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  LastPageRounded as LastPageIcon,
  FirstPageRounded as FirstPageIcon,
  KeyboardArrowRightRounded as KeyboardArrowRightIcon,
  KeyboardArrowLeftRounded as KeyboardArrowLeftIcon,
  DeleteRounded,
  CreateRounded
} from '@material-ui/icons';
import Loader from '../../components/loader/loader';
import FormEditPasien from './FormEditPasien'
import axios from 'axios'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: '4.5px'
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'nik',
    numeric: false,
    disablePadding: true,
    label: 'NIK'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nama Lengkap'
  },
  { id: 'address', numeric: false, disablePadding: false, label: 'Alamat' },
  { id: 'age', numeric: false, disablePadding: false, label: 'Usia' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Jenis Kelamin' },
  { id: 'diagnose', numeric: false, disablePadding: false, label: 'Diagnose' }
];

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll', 
  }
}));

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  const classes = useStyles()

  return (
    <TableHead>
      <TableRow>
        <TableCell
        />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

function Row(props) {
  const classes = useRowStyles();
  const styles = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))

  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleOpenDialog = () => setOpenDialog(!openDialog)

  const handleOpenSnackbar = () => setOpenSnackbar(!openSnackbar)

  const handleOpenModal = () => setOpenModal(!openModal)

  const deletePasien = async ({_id}) => {
    const response = await axios.delete(`http://localhost:1337/pasien/${_id}`);

    if (response.data.success === 1) {
      handleOpenDialog();
      handleOpenSnackbar()
      props.refreshData()
    } else {
      handleOpenSnackbar({success: false});
    }
  };

  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={{ textTransform: 'capitalize' }}
        key={row.name}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {' '}
          {row.nik}{' '}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">{row.age} Tahun</TableCell>
        <TableCell align="left">
          {row.gender === 'l' ? 'Pria' : 'Wanita'}
        </TableCell>
        <TableCell align="left" style={{ fontWeight: 700 }}>
          {row.diagnose}
        </TableCell>
      </TableRow>
      <TableRow style={{ textTransform: 'capitalize' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ fontSize: small ? '1rem' : '1.4rem', fontWeight: 700 }}
              >
                Detail Pasien
              </Typography>
            </Box>
            <Box margin={1}>
              <Grid container spacing={3} direction="row">
                <Grid item sm={12} md={6}>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Nama Lengkap
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                      >
                        {row.name}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Alamat
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                      >
                        {row.address}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Kelurahan
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom fontWeight={700}>
                        {row.kelurahan ? row.kelurahan : '-'}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Kecamatan
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                      >
                        {row.kecamatan ? row.kecamatan : '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={6}>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Rumahsakit
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                        style={{
                          textTransform: 'uppercase'
                        }}
                      >
                        {row.hospital}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Diagnosa
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                      >
                        {row.diagnose}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Diagnosa Tambahan
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                      >
                        {row.additional_diagnose
                          ? row.additional_diagnose
                          : ' - '}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <Typography variant="body1" gutterBottom component="div">
                        Status Diagnosa
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        gutterBottom
                        component="div"
                        fontWeight={700}
                      >
                        {row.status_diagnose}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {localStorage.getItem('role') !== 'super admin' 
            ? <Box sx={{ p: 2 }}>
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
                      onClick={handleOpenModal}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              : ''
            }
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Modal Edit Pasien */}
      <Modal
        className={styles.modal}
        open={openModal}
        onClose={handleOpenModal}
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper>
            <FormEditPasien
              refreshData={props.refreshData}
              open={openModal}
              setOpen={setOpenModal}
              pasien={props.row}
            />
          </Paper>
        </Fade>
      </Modal>

      {/* Dialog Delete Pasien */}
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle id="alert-dialog-title">
          {'Hapus Data Rumahsakit ' + row.name + '?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin akan menghapus data {row.name.toUpperCase()}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog} color="inherit" size="small">
            Batalkan
          </Button>
          <Button
            onClick={async () => deletePasien({ _id: row._id })}
            autoFocus
            variant="outlined"
            size="small"
            color="error"
          >
            Lanjutkan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Success Delete Pasien */}
      {openSnackbar ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleOpenSnackbar}
        >
          <Alert onClose={handleOpenSnackbar} severity="success">
            Data pasien {row.name} telah berhasil dihapus
          </Alert>
        </Snackbar>
      ) : null}
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const pasien = props.pasiens;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = React.useState([]);

  if (!(pasien)) {
    return <Loader />;
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, pasien.length - page * rowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = pasien.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={pasien.length}
          />
          <TableBody>
            {stableSort(pasien, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <Row
                    key={row._id}
                    row={row}
                    refreshData={props.refreshData}
                  />
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={12}
                count={pasien.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}