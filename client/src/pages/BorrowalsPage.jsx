import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from 'react';

// @mui
import {Alert} from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  getBreadcrumbsUtilityClass,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

// components
import axios from 'axios'
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import BorrowalsTableHead from '../sections/@dashboard/borrowals/BorrowalsListHead'
import BorrowalsForm from "../sections/@dashboard/borrowals/BorrowalsForm";
import BorrowalsDialog from "../sections/@dashboard/borrowals/BorrowalsDialog";
import {applySortFilter, getComparator} from "../utils/tableOperations";


// ----------------------------------------------------------------------

const TABLE_HEAD = [{id: 'photo', label: 'Photo', alignRight: false}, {
  id: 'name',
  label: 'Name',
  alignRight: false
}, {id: 'description', label: 'Description', alignRight: false}, {id: '', label: '', alignRight: false},];

// ----------------------------------------------------------------------

const BorrowalsPage = () => {
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [borrowals, setBorrowals] = useState({
    id: "",
    name: "",
    description: "",
  })
  const [selectedBorrowalsId, setSelectedBorrowalsId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // Load data on initial page load
  useEffect(() => {
    getAllBorrowals();
  }, []);

  // API operations

  const getBorrowals = () => {
    axios.get(`http://localhost:8080/api/borrowals/get${selectedBorrowalsId}`)
      .then((response) => {
        // handle success
        const borrowals = response.data.borrowals
        console.log(response.data.borrowals);
        setBorrowals({id: borrowals._id, name: borrowals.name, description: borrowals.description})
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const getAllBorrowals = () => {
    axios.get('http://localhost:8080/api/borrowals/getAll')
      .then((response) => {
        // handle success
        console.log(response.data)
        setBorrowals(response.data.borrowalsList)
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addBorrowals = () => {
    axios.post('http://localhost:8080/api/borrowals/add', {
      "name": borrowals.name,
      "description": borrowals.description,
      "photoUrl": borrowals.photoUrl
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        getAllBorrowals();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong, please try again")
      });
  }

  const updateBorrowals = () => {
    axios.put(`http://localhost:8080/api/borrowals/update/${selectedBorrowalsId}`, {
      "name": borrowals.name,
      "description": borrowals.description,
      "photoUrl": borrowals.photoUrl
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllBorrowals();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong, please try again")
      });
  }

  const deleteBorrowals = (borrowalsId) => {
    axios.put(`http://localhost:8080/api/borrowals/delete/${borrowalsId}`)
      .then((response) => {
        handleCloseDialog();
        handleCloseMenu();
        console.log(response.data);
        getAllBorrowals();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong, please try again")
      });
  }

  const getSelectedBorrowalsDetails = () => {
    const selectedBorrowals = borrowals.find((element) => element._id === selectedBorrowalsId)
    setBorrowals(selectedBorrowals)
  }

  const clearForm = () => {
    setBorrowals({id: "", name: "", description: ""})
  }

  // Handler functions
  const handleOpenMenu = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Table functions

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setBorrowals(applySortFilter(borrowals, getComparator(order, orderBy), filterName));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (<>
    <Helmet>
      <title>Borrowals</title>
    </Helmet>


    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          Borrowals
        </Typography>
        <Button variant="contained" onClick={() => {
          setIsUpdateForm(false);
          handleOpenModal();
        }} startIcon={<Iconify icon="eva:plus-fill"/>}>
          New Borrowals
        </Button>
      </Stack>
      {isTableLoading ? <Grid style={{"textAlign": "center"}}><CircularProgress size="lg"/></Grid> : <Card>
        <Scrollbar>
          {borrowals.length > 0 ? <TableContainer sx={{minWidth: 800}}>
            <Table>
              <BorrowalsTableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={borrowals.length}
                onRequestSort={handleRequestSort}
              /><TableBody>
              {borrowals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const {_id, name, description, photoUrl} = row;

                return (<TableRow hover key={_id} tabIndex={-1}>
                  <TableCell align="center"><Stack direction="row"
                                                   alignItems="center"
                                                   spacing={4}>
                    <Avatar alt={name} src={photoUrl}/>

                  </Stack></TableCell>

                  <TableCell align="left"><Typography variant="subtitle2"
                                                      noWrap>
                    {name}
                  </Typography></TableCell>

                  <TableCell align="left">{description}</TableCell>

                  <TableCell align="right">
                    <IconButton size="large" color="inherit" onClick={(e) => {
                      setSelectedBorrowalsId(_id)
                      handleOpenMenu(e)
                    }}>
                      <Iconify icon={'eva:more-vertical-fill'}/>
                    </IconButton>
                  </TableCell>
                </TableRow>);
              })}
            </TableBody></Table>
          </TableContainer> : <Alert severity="warning" color="warning">
            No borrowals found
          </Alert>}
        </Scrollbar>
        {borrowals.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={borrowals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </Card>}
    </Container>

    <Popover
      open={Boolean(isMenuOpen)}
      anchorEl={isMenuOpen}
      onClose={handleCloseMenu}
      anchorOrigin={{vertical: 'top', horizontal: 'left'}}
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      PaperProps={{
        sx: {
          p: 1, width: 140, '& .MuiMenuItem-root': {
            px: 1, typography: 'body2', borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => {
        setIsUpdateForm(true);
        getSelectedBorrowalsDetails();
        handleCloseMenu();
        handleOpenModal();
      }}>
        <Iconify icon={'eva:edit-fill'} sx={{mr: 2}}/>
        Edit
      </MenuItem>

      <MenuItem sx={{color: 'error.main'}} onClick={handleOpenDialog}>
        <Iconify icon={'eva:trash-2-outline'} sx={{mr: 2}}/>
        Delete
      </MenuItem>
    </Popover>

    <BorrowalsForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
                id={selectedBorrowalsId} borrowals={borrowals} setBorrowals={setBorrowals}
                handleAddBorrowals={addBorrowals} handleUpdateBorrowals={updateBorrowals}/>

    <BorrowalsDialog isDialogOpen={isDialogOpen} borrowalsId={selectedBorrowalsId} handleDeleteBorrowals={deleteBorrowals}
                  handleCloseDialog={handleCloseDialog}/>


  </>);
}

export default BorrowalsPage
