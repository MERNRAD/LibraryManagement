import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from 'react';
import {Alert} from "@mui/lab";
import {
  Button,
  Card,
  CircularProgress,
  Container,
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

import axios from 'axios'
import toast from 'react-hot-toast';

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import BorrowalListHead from '../sections/@dashboard/borrowal/BorrowalListHead'
import BorrowalForm from "../sections/@dashboard/borrowal/BorrowalForm";
import BorrowalsDialog from "../sections/@dashboard/borrowal/BorrowalDialog";
import {applySortFilter, getComparator} from "../utils/tableOperations";


// ----------------------------------------------------------------------

const TABLE_HEAD = [{id: 'memberName', label: 'Member Name', alignRight: false},
  {id: 'bookName', label: 'Book Name', alignRight: false},
  {id: 'isbn', label: 'ISBN', alignRight: false},
  {id: 'borrowedDate', label: 'Borrowed On', alignRight: false},
  {id: 'dueDate', label: 'Due On', alignRight: false},
  {id: 'status', label: 'Status', alignRight: false},
  {id: '', label: '', alignRight: false},];

// ----------------------------------------------------------------------

const BorrowalPage = () => {
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [borrowal, setBorrowal] = useState({
    bookId: "",
    memberId: "",
    borrowedDate: null,
    dueDate: null,
    status: ""
  })
  const [selectedBorrowalId, setSelectedBorrowalId] = useState(null)
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
    axios.get(`http://localhost:8080/api/borrowal/get${selectedBorrowalId}`)
      .then((response) => {
        // handle success
        const borrowal = response.data.borrowal
        console.log(response.data.borrowal);
        setBorrowal(borrowal)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const getAllBorrowals = () => {
    axios.get('http://localhost:8080/api/borrowal/getAll')
      .then((response) => {
        // handle success
        console.log(response.data)
        setBorrowal(response.data.borrowalsList)
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addBorrowal = () => {
    alert("add")
    axios.post('http://localhost:8080/api/borrowal/add', borrowal)
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        getAllBorrowals();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const updateBorrowal = () => {
    axios.put(`http://localhost:8080/api/borrowal/update/${selectedBorrowalId}`, borrowal)
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllBorrowals();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const deleteBorrowal = (borrowalsId) => {
    axios.delete(`http://localhost:8080/api/borrowal/delete/${borrowalsId}`)
      .then((response) => {
        handleCloseDialog();
        handleCloseMenu();
        console.log(response.data);
        getAllBorrowals();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const getSelectedBorrowalDetails = () => {
    const selectedBorrowals = borrowal.find((element) => element._id === selectedBorrowalId)
    setBorrowal(selectedBorrowals)
  }

  const clearForm = () => {
    setBorrowal({
      bookId: "",
      memberId: "",
      borrowedDate: null,
      dueDate: null,
      status: ""
    })
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
    setBorrowal(applySortFilter(borrowal, getComparator(order, orderBy), filterName));
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
          New Borrowal
        </Button>
      </Stack>
      {isTableLoading ? <Grid style={{"textAlign": "center"}}><CircularProgress size="lg"/></Grid> : <Card>
        <Scrollbar>
          {borrowal.length > 0 ? <TableContainer sx={{minWidth: 800}}>
            <Table>
              <BorrowalListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={borrowal.length}
                onRequestSort={handleRequestSort}
              /><TableBody>
              {borrowal.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const {_id, memberId, bookId, borrowedDate, dueDate} = row;

                return (<TableRow hover key={_id} tabIndex={-1}>


                  <TableCell align="left"> {memberId} </TableCell>

                  <TableCell align="left">{bookId}</TableCell>
                  <TableCell align="left"> {borrowedDate} </TableCell>

                  <TableCell align="left">{dueDate}</TableCell>

                  <TableCell align="right">
                    <IconButton size="large" color="inherit" onClick={(e) => {
                      setSelectedBorrowalId(_id)
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
        {borrowal.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={borrowal.length}
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
        getSelectedBorrowalDetails();
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

    <BorrowalForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
                  id={selectedBorrowalId} borrowal={borrowal} setBorrowal={setBorrowal}
                  handleAddBorrowals={addBorrowal} handleUpdateBorrowals={updateBorrowal}/>

    <BorrowalsDialog isDialogOpen={isDialogOpen} borrowalsId={selectedBorrowalId}
                     handleDeleteBorrowals={deleteBorrowal}
                     handleCloseDialog={handleCloseDialog}/>


  </>);
}

export default BorrowalPage
