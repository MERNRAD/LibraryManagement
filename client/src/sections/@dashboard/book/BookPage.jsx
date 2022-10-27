import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
} from "@mui/material";
import { Alert } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../../hooks/useAuth";

import Label from "../../../components/label";
import BookDialog from "./BookDialog";
import BookForm from "./BookForm";
import Iconify from "../../../components/iconify";
import { apiUrl, methods, routes } from "../../../constants";

// ----------------------------------------------------------------------

const StyledBookImage = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute"
});

const BookPage = () => {
  const {user} = useAuth();
  // Data
  const [book, setBook] = useState({
    id: "", name: "", isbn: "", summary: "", isAvailable: true, authorId: "", genreId: "", photoUrl: ""
  })
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // API operations

  const getAllBooks = () => {
    axios.get(apiUrl(routes.BOOK, methods.GET_ALL))
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
    axios.post(apiUrl(routes.BOOK, methods.POST), book)
      .then((response) => {
        toast.success("Book added");
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
    axios.put(apiUrl(routes.BOOK, methods.PUT, selectedBookId), book)
      .then((response) => {
        toast.success("Book updated");
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
    axios.delete(apiUrl(routes.BOOK, methods.DELETE, bookId))
      .then((response) => {
        toast.success("Book deleted");
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
    console.log(selectedBook)
    setBook(selectedBook)
  }

  const clearForm = () => {
    setBook({id: "", name: "", isbn: "", summary: "", isAvailable: true, authorId: "", genreId: "", photoUrl: ""})
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

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Helmet>
        <title> Books </title>
      </Helmet>

      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

          <Typography variant="h3" sx={{mb: 5}}>
            Books
          </Typography>
          {user.isAdmin && <Button variant="contained" onClick={() => {
            setIsUpdateForm(false);
            handleOpenModal();
          }} startIcon={<Iconify icon="eva:plus-fill"/>}>
            New Book
          </Button>}
        </Stack>

        {isTableLoading ? <Grid padding={2} style={{"textAlign": "center"}}><CircularProgress/></Grid> :

          books.length > 0 ? <Grid container spacing={4}>
            {books.map((book) => (
              <Grid key={book._id} item xs={12} sm={6} md={4}>
                <Card>
                  <Box sx={{pt: '80%', position: 'relative'}}>
                    <Label
                      variant="filled"
                      sx={{
                        zIndex: 9,
                        top: 16,
                        left: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                        color: 'primary.main',
                      }}
                    >
                      {book.genre.name}
                    </Label>
                    {user.isAdmin && <Label
                      variant="filled"
                      sx={{
                        zIndex: 9,
                        top: 12,
                        right: 16,
                        position: 'absolute',
                        borderRadius: "100%",
                        width: "30px",
                        height: "30px",
                        color: "white",
                        backgroundColor: "white"
                      }}
                    >
                      <IconButton size="small" color="primary" onClick={(e) => {
                        setSelectedBookId(book._id)
                        handleOpenMenu(e)
                      }}>
                        <Iconify icon={'eva:more-vertical-fill'}/>
                      </IconButton>
                    </Label>}


                    <StyledBookImage alt={book.name} src={book.photoUrl}/>
                  </Box>

                  <Stack spacing={1} sx={{p: 2}}>
                    <Typography textAlign="center" variant="h5" margin={0} noWrap>{book.name}</Typography>
                    <Typography variant="subtitle1" sx={{color: "#888888"}} paddingBottom={1} noWrap
                                textAlign="center">{book.author.name}</Typography>
                    <Label color={book.isAvailable ? "success" : "error"}
                           sx={{padding: 2}}>{book.isAvailable ? 'Available' : 'Not available'}</Label>

                    <Typography variant="subtitle2" textAlign="center" paddingTop={1}>ISBN: {book.isbn}</Typography>
                    <Typography variant="body2">{book.summary}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid> : <Alert severity="warning" color="warning">
            No books found
          </Alert>
        }
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
          getSelectedBookDetails();
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

      <BookForm isUpdateForm={isUpdateForm} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}
                id={selectedBookId} book={book} setBook={setBook}
                handleAddBook={addBook} handleUpdateBook={updateBook}/>

      <BookDialog isDialogOpen={isDialogOpen} bookId={selectedBookId} handleDeleteBook={deleteBook}
                  handleCloseDialog={handleCloseDialog}/>

    </>
  );


}

export default BookPage;
