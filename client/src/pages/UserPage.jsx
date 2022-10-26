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
import UserTableHead from '../sections/@dashboard/user/UserListHead'
import UserForm from "../sections/@dashboard/user/UserForm";
import UserDialog from "../sections/@dashboard/user/UserDialog";
import {applySortFilter, getComparator} from "../utils/tableOperations";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {id: 'name', label: 'Name', alignRight: false}, 
  {  id: 'password',  label: 'Password',  alignRight: false},  
  {id: '', label: '', alignRight: false},];

// ----------------------------------------------------------------------

const UserPage = () => {
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [user, setUser] = useState({
    id: "",
    name: "",
    description: "",
    photoUrl: "https://www.pngitem.com/pimgs/m/645-6452863_profile-image-memoji-brown-hair-man-with-glasses.png"
  })
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // Load data on initial page load
  useEffect(() => {
    getAllUsers();
  }, []);

  // API operations

  const getUser = () => {
    axios.get(`http://localhost:8080/api/user/get${selectedUserId}`)
      .then((response) => {
        // handle success
        const user = response.data.user
        console.log(response.data.user);
        setUser({id: "", name: user.name, description: user.description})
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const getAllUsers = () => {
    axios.get('http://localhost:8080/api/user/getAll')
      .then((response) => {
        // handle success
        console.log(response.data)
        setUsers(response.data.usersList)
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addUser = () => {
    axios.post('http://localhost:8080/api/user/add', {
      "name": user.name,
      "password": user.password
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        getAllUsers();
        clearForm();
      })
      .catch((error) => {
<<<<<<< Updated upstream
        console.log(error);
        alert("Something went wrong, please try again")
=======
        if (error.response.status === 403) {
          toast.error("User already exists")
        } else {
          console.log(error);
          toast.error("Something went wrong, please try again")
        }
>>>>>>> Stashed changes
      });
  }

  const updateUser = () => {
    axios.put(`http://localhost:8080/api/user/update/${selectedUserId}`, {
      "name": user.name,
      "password": user.password
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllUsers();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:8080/api/user/delete/${userId}`)
      .then((response) => {
        handleCloseDialog();
        handleCloseMenu();
        console.log(response.data);
        getAllUsers();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const getSelectedUserDetails = () => {
    const selectedUser = users.find((element) => element._id === selectedUserId)
    setUser(selectedUser)
  }

  const clearForm = () => {
    setUser({id: "", name: "", description: ""})
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
    setUsers(applySortFilter(users, getComparator(order, orderBy), filterName));
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
      <title>Users</title>
    </Helmet>


    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          Users
        </Typography>
        <Button variant="contained" onClick={() => {
          setIsUpdateForm(false);
          handleOpenModal();
        }} startIcon={<Iconify icon="eva:plus-fill"/>}>
          New User
        </Button>
      </Stack>
      {isTableLoading ? <Grid style={{"textAlign": "center"}}><CircularProgress size="lg"/></Grid> : <Card>
        <Scrollbar>
          {users.length > 0 ? <TableContainer sx={{minWidth: 800}}>
            <Table>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                onRequestSort={handleRequestSort}
              /><TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const {_id, name, password} = row;

                return (<TableRow hover key={_id} tabIndex={-1}>
                 

                  <TableCell align="left"><Typography variant="subtitle2"
                                                      noWrap>
                    {name}
                  </Typography></TableCell>

                  <TableCell align="left">{password}</TableCell>

                  <TableCell align="right">
                    <IconButton size="large" color="inherit" onClick={(e) => {
                      setSelectedUserId(_id)
                      handleOpenMenu(e)
                    }}>
                      <Iconify icon={'eva:more-vertical-fill'}/>
                    </IconButton>
                  </TableCell>
                </TableRow>);
              })}
            </TableBody></Table>
          </TableContainer> : <Alert severity="warning" color="warning">
            No users found
          </Alert>}
        </Scrollbar>
        {users.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
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
        getSelectedUserDetails();
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

    <UserForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
                id={selectedUserId} user={user} setUser={setUser}
                handleAddUser={addUser} handleUpdateUser={updateUser}/>

    <UserDialog isDialogOpen={isDialogOpen} userId={selectedUserId} handleDeleteUser={deleteUser}
                  handleCloseDialog={handleCloseDialog}/>


  </>);
}

export default UserPage
