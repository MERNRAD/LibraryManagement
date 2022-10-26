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
import toast  from 'react-hot-toast';

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import GenreTableHead from '../sections/@dashboard/genre/GenreListHead'
import GenreForm from "../sections/@dashboard/genre/GenreForm";
import GenreDialog from "../sections/@dashboard/genre/GenreDialog";
import {applySortFilter, getComparator} from "../utils/tableOperations";


// ----------------------------------------------------------------------

const TABLE_HEAD = [{id: 'photo', label: 'Photo', alignRight: false}, {
  id: 'name',
  label: 'Name',
  alignRight: false
}, {id: 'description', label: 'Description', alignRight: false}, {id: '', label: '', alignRight: false},];

// ----------------------------------------------------------------------

const GenrePage = () => {
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [genre, setGenre] = useState({
    id: "",
    name: "",
    description: "",
  })
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // Load data on initial page load
  useEffect(() => {
    getAllGenres();
  }, []);

  // API operations

  const getGenre = () => {
    axios.get(`http://localhost:8080/api/genre/get${selectedGenreId}`)
      .then((response) => {
        // handle success
        const genre = response.data.genre
        console.log(response.data.genre);
        setGenre({id: genre._id, name: genre.name, description: genre.description})
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const getAllGenres = () => {
    axios.get('http://localhost:8080/api/genre/getAll')
      .then((response) => {
        // handle success
        console.log(response.data)
        setGenres(response.data.genresList)
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addGenre = () => {
    axios.post('http://localhost:8080/api/genre/add', {
      "name": genre.name,
      "description": genre.description,
      "photoUrl": genre.photoUrl
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        getAllGenres();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const updateGenre = () => {
    axios.put(`http://localhost:8080/api/genre/update/${selectedGenreId}`, {
      "name": genre.name,
      "description": genre.description,
      "photoUrl": genre.photoUrl
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllGenres();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const deleteGenre = (genreId) => {
    axios.delete(`http://localhost:8080/api/genre/delete/${genreId}`)
      .then((response) => {
        handleCloseDialog();
        handleCloseMenu();
        console.log(response.data);
        getAllGenres();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const getSelectedGenreDetails = () => {
    const selectedGenre = genres.find((element) => element._id === selectedGenreId)
    setGenre(selectedGenre)
  }

  const clearForm = () => {
    setGenre({id: "", name: "", description: ""})
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
    setGenres(applySortFilter(genres, getComparator(order, orderBy), filterName));
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
      <title>Genres</title>
    </Helmet>


    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          Genres
        </Typography>
        <Button variant="contained" onClick={() => {
          setIsUpdateForm(false);
          handleOpenModal();
        }} startIcon={<Iconify icon="eva:plus-fill"/>}>
          New Genre
        </Button>
      </Stack>
      {isTableLoading ? <Grid style={{"textAlign": "center"}}><CircularProgress size="lg"/></Grid> : <Card>
        <Scrollbar>
          {genres.length > 0 ? <TableContainer sx={{minWidth: 800}}>
            <Table>
              <GenreTableHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={genres.length}
                onRequestSort={handleRequestSort}
              /><TableBody>
              {genres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                      setSelectedGenreId(_id)
                      handleOpenMenu(e)
                    }}>
                      <Iconify icon={'eva:more-vertical-fill'}/>
                    </IconButton>
                  </TableCell>
                </TableRow>);
              })}
            </TableBody></Table>
          </TableContainer> : <Alert severity="warning" color="warning">
            No genres found
          </Alert>}
        </Scrollbar>
        {genres.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={genres.length}
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
        getSelectedGenreDetails();
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

    <GenreForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
                id={selectedGenreId} genre={genre} setGenre={setGenre}
                handleAddGenre={addGenre} handleUpdateGenre={updateGenre}/>

    <GenreDialog isDialogOpen={isDialogOpen} genreId={selectedGenreId} handleDeleteGenre={deleteGenre}
                  handleCloseDialog={handleCloseDialog}/>


  </>);
}

export default GenrePage
