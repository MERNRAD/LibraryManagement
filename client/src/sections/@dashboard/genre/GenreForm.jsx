import {Box, Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

const GenreForm = ({
                      isUpdateForm,
                      isModalOpen,
                      handleCloseModal,
                      genre,
                      setGenre,
                      handleAddGenre,
                      handleUpdateGenre
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
      <Box sx={style}>
        <Container>
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} genre
          </Typography>
          <Stack spacing={3} paddingY={2}>

            <TextField name="name" label="Genre name" value={genre.name} autoFocus required
                       onChange={(e) => setGenre({...genre, name: e.target.value})}/>
            <TextField name="description" label="Description" value={genre.description} multiline
                       rows={2}
                       maxRows={4}
                       onChange={(e) => setGenre({...genre, description: e.target.value})}
            />

            <br/>
            <Box textAlign="center">
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateGenre : handleAddGenre}
                      startIcon={<Iconify icon="bi:check-lg"/>} style={{marginRight: "12px"}}>
                Submit
              </Button>

              <Button size="large" color="inherit" variant="contained" onClick={handleCloseModal}
                      startIcon={<Iconify icon="charm:cross"/>} style={{marginLeft: "12px"}}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
}

GenreForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  genre: PropTypes.object,
  setGenre: PropTypes.func,
  handleAddGenre: PropTypes.func,
  handleUpdateGenre: PropTypes.func
};

export default GenreForm
