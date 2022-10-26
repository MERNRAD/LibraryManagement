import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


// @mui
<<<<<<< Updated upstream:client/src/pages/BooksPage.jsx
import { Box, Card, Button, IconButton, Link, Popover, MenuItem, Container, Stack, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

=======
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography
} from '@mui/material';
import {styled} from '@mui/material/styles';

import toast  from 'react-hot-toast';


import {Alert} from "@mui/lab";
>>>>>>> Stashed changes:client/src/pages/BookPage.jsx
import Iconify from '../components/iconify';
import Label from '../components/label';

// components
import BookDialog from "../sections/@dashboard/books/BookDialog";

import BookForm from "../sections/@dashboard/books/BookForm";

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const BookPage = () => {
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [book, setBook] = useState({
    id: "", name: "", isbn: "", summary: "", isAvailable: "", authorId: "", genreId: "", photoUrl: ""

  })
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // API operations

  const getBook = () => {
    axios.get(`http://localhost:8080/api/book/get${selectedBookId}`)
      .then((response) => {
        // handle success
        const book = response.data.book
        console.log(response.data.book);
        setBook({ id: "", name: book.name, description: book.description })
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const getAllBooks = () => {
    axios.get('http://localhost:8080/api/book/getAll')
      .then((response) => {
        // handle success
        console.log(response.data)
        setBooks(response.data.booksList)
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addBook = () => {
    axios.post('http://localhost:8080/api/book/add', {
      name: book.name, 
      isbn: book.isbn, 
      summary: book.summary, 
      isAvailable: book.isAvailable, 
      authorId: book.authorId, 
      genreId: book.genreId, 
      photoUrl: book.photoUrl

    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        getAllBooks();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const updateBook = () => {
    axios.put(`http://localhost:8080/api/book/update/${selectedBookId}`, {
      name: book.name, 
      isbn: book.isbn, 
      summary: book.summary, 
      isAvailable: book.isAvailable, 
      authorId: book.authorId, 
      genreId: book.genreId, 
      photoUrl: book.photoUrl
    })
      .then((response) => {
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllBooks();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const deleteBook = (bookId) => {
    axios.delete(`http://localhost:8080/api/book/delete/${bookId}`)
      .then((response) => {
        handleCloseDialog();
        handleCloseMenu();
        console.log(response.data);
        getAllBooks();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const getSelectedBookDetails = () => {
    const selectedBook = books.find((element) => element._id === selectedBookId)
    setBook(selectedBook)
  }

  const clearForm = () => {
    setBook({ id: "", name: "", description: "" })
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

  // Load data on initial page load
  useEffect(() => {
    getAllBooks();
  }, []);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const { id, name, isbn, summary, isAvailable, authorId, genreId, photoUrl } = book;


  BookPage.propTypes = {
    book: PropTypes.object,
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Books</title>
      </Helmet>

      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

          <Typography variant="h4" sx={{ mb: 5 }}>
            Books
          </Typography>
          <Button variant="contained" onClick={() => {
            setIsUpdateForm(false);
            handleOpenModal();
          }} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Book
          </Button>
        </Stack>

        <Grid container spacing={4}>
          {books.map((book) => (
            <Grid key={book._id} item xs={12} sm={6} md={4}>
              <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                  <Label
                    variant="filled"
                    sx={{
                      zIndex: 9,
                      top: 16,
                      right: 16,
                      position: 'absolute',
                      textTransform: 'uppercase',
                    }}
                  >
                    {book.genreId}
                  </Label>
                  <Label
                    variant="filled"
                    sx={{
                      zIndex: 9,
                      top: 16,
                      left: 16,
                      position: 'absolute',
                      textTransform: 'uppercase',
                    }}
                  >
                    <IconButton size="large" color="inherit" onClick={(e) => {
                      setSelectedBookId(book._id)
                      handleOpenMenu(e)
                    }}>
                      <Iconify icon={'eva:more-vertical-fill'} />
                    </IconButton>
                  </Label>


                  <StyledProductImg alt={book.name} src={book.photoUrl} />
                </Box>

                <Stack spacing={1} sx={{ p: 2 }}>

                  <Typography variant="h5" margin={0} noWrap>{name}</Typography>
                  <Typography variant="subtitle1" noWrap>{authorId}</Typography>
                  <Button>{book.isAvailable ? 'Available' : 'N/A'}</Button>

                  <Typography variant="subtitle1">ISBN: {book.isbn}</Typography>
                  <Typography variant="body1">{book.summary}</Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Popover
        open={Boolean(isMenuOpen)}
        anchorEl={isMenuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          getSelectedBookDetails();
          handleCloseMenu();
          handleOpenModal();
        }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDialog}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <BookForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
        id={selectedBookId} book={book} setBook={setBook}
        handleAddBook={addBook} handleUpdateBook={updateBook} />

      <BookDialog isDialogOpen={isDialogOpen} bookId={selectedBookId} handleDeleteBook={deleteBook}
        handleCloseDialog={handleCloseDialog} />

    </>
  );



}

export default BookPage;