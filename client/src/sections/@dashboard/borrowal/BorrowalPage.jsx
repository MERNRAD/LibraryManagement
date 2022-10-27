import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Alert } from "@mui/lab";
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
  Typography
} from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

import BorrowalListHead from "./BorrowalListHead";
import BorrowalForm from "./BorrowalForm";
import BorrowalsDialog from "./BorrowalDialog";
import { applySortFilter, getComparator } from "../../../utils/tableOperations";
import { apiUrl, methods, routes } from "../../../constants";

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: "memberName", label: "Member Name", alignRight: false },
  { id: "bookName", label: "Book Name", alignRight: false },
  { id: "borrowedDate", label: "Borrowed On", alignRight: false },
  { id: "dueDate", label: "Due On", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "", label: "", alignRight: true }, { id: "", label: "", alignRight: false }];


// ----------------------------------------------------------------------

const BorrowalPage = () => {
  const {user} = useAuth();
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
    borrowedDate: "",
    dueDate: "",
    status: ""
  })
  const [borrowals, setBorrowals] = useState([]);
  const [selectedBorrowalId, setSelectedBorrowalId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // Load data on initial page load
  useEffect(() => {
    getAllBorrowals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API operations=

  const getAllBorrowals = () => {
    axios.get(apiUrl(routes.BORROWAL, methods.GET_ALL))
      .then((response) => {
        // handle success
        console.log(response.data)
        if (user.isAdmin) {
          setBorrowals(response.data.borrowalsList)
        } else {
          setBorrowals(response.data.borrowalsList.filter((borrowal) => user._id === borrowal.memberId))
        }
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addBorrowal = () => {
    axios.post(apiUrl(routes.BORROWAL, methods.POST), borrowal)
      .then((response) => {
        toast.success("Borrowal added");
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
    axios.put(apiUrl(routes.BORROWAL, methods.PUT, selectedBorrowalId), borrowal)
      .then((response) => {
        toast.success("Borrowal updated");
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

  const deleteBorrowal = () => {
    axios.delete(apiUrl(routes.BORROWAL, methods.PUT, selectedBorrowalId))
      .then((response) => {
        toast.success("Borrowal deleted");
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
    const selectedBorrowals = borrowals.find((element) => element._id === selectedBorrowalId)
    setBorrowal(selectedBorrowals)
  }

  const clearForm = () => {
    setBorrowal({
      bookId: "",
      memberId: "",
      borrowedDate: "",
      dueDate: "",
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
          {borrowals.length > 0 ? <TableContainer sx={{minWidth: 800}}>
            <Table>
              <BorrowalListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={borrowal.length}
                onRequestSort={handleRequestSort}
              /><TableBody>
              {borrowals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((borrowal) => <TableRow hover key={borrowal._id} tabIndex={-1}>


                  <TableCell align="left"> {borrowal.member.name} </TableCell>

                  <TableCell align="left">{borrowal.book.name}</TableCell>
                  <TableCell align="left"> {(new Date(borrowal.borrowedDate)).toLocaleDateString("en-US")} </TableCell>

                  <TableCell align="left">{(new Date(borrowal.dueDate)).toLocaleDateString("en-US")}</TableCell>

                  <TableCell align="left">{borrowal.status}</TableCell>

                  <TableCell align="left">
                    {(new Date(borrowal.dueDate) < new Date()) &&
                      <Label color="error" sx={{padding: 2}}>Overdue</Label>}</TableCell>

                  <TableCell align="right">
                    <IconButton size="large" color="inherit" onClick={(e) => {
                      setSelectedBorrowalId(borrowal._id)
                      handleOpenMenu(e)
                    }}>
                      <Iconify icon={'eva:more-vertical-fill'}/>
                    </IconButton>
                  </TableCell>
                </TableRow>)}
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
                  handleAddBorrowal={addBorrowal} handleUpdateBorrowal={updateBorrowal}/>

    <BorrowalsDialog isDialogOpen={isDialogOpen} borrowalsId={selectedBorrowalId}
                     handleDeleteBorrowal={deleteBorrowal}
                     handleCloseDialog={handleCloseDialog}/>


  </>);
}

export default BorrowalPage
