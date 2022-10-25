import {
  Box,
  Button,
  Container,
  Modal,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

const BookForm = ({
  isUpdateForm,
  isModalOpen,
  handleCloseModal,
  book,
  setBook,
  handleAddBook,
  handleUpdateBook
}) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: 16,
    p: 4,
  };


  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box  sx={style}>
        <Container>
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} book
          </Typography>
          <Stack spacing={3} paddingY={2} 
    height="600px" 
    overflow="scroll">

            <TextField name="name" label="Book name" value={book.name} autoFocus required
              onChange={(e) => setBook({ ...book, name: e.target.value })} />
            <TextField name="isbn" label="ISBN" value={book.isbn} autoFocus required
              onChange={(e) => setBook({ ...book, isbn: e.target.value })} />

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="author-label">Author</InputLabel>
              <Select
                labelId="author-label"
                id="author"
                value={book.authorId}
                label="Author"
                onChange={(e) => setBook({ ...book, authorId: e.target.value })}>


                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre"
                value={book.author}
                label="Genre"
                onChange={(e) => setBook({ ...book, genre: e.target.value })}>


                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>


            <FormControl>
              <FormLabel id="available-label">Availability</FormLabel>
              <RadioGroup
                aria-labelledby="available-label"
                defaultValue="true"
                name="radio-buttons-group"
              >
                <FormControlLabel value="true" control={<Radio />} label="Available" />
                <FormControlLabel value="false" control={<Radio />} label="Un Available" />
              </RadioGroup>
            </FormControl>

            <TextField name="summary" label="Summary" value={book.summary} multiline
              rows={2}
              maxRows={4}
              onChange={(e) => setBook({ ...book, summary: e.target.value })}
            />

            <Button
              size="large"
              variant="outlined"
              component="label"
              color="info"
            >
              Upload photo
              <input
                type="file"
                accept="image/jpeg, image/png"
                hidden
              />
            </Button>

            <br />
            <Box textAlign="center">
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateBook : handleAddBook}
                startIcon={<Iconify icon="bi:check-lg" />} style={{ marginRight: "12px" }}>
                Submit
              </Button>

              <Button size="large" color="inherit" variant="contained" onClick={handleCloseModal}
                startIcon={<Iconify icon="charm:cross" />} style={{ marginLeft: "12px" }}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box >
    </Modal >
  );
}

BookForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  book: PropTypes.object,
  setBook: PropTypes.func,
  handleAddBook: PropTypes.func,
  handleUpdateBook: PropTypes.func
};

export default BookForm
