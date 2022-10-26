import {Box, Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

const AuthorForm = ({
                      isUpdateForm,
                      isModalOpen,
                      handleCloseModal,
                      author,
                      setAuthor,
                      handleAddAuthor,
                      handleUpdateAuthor
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
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} author
          </Typography>
          <Stack spacing={3} paddingY={2}>

            <TextField name="name" label="Author name" value={author.name} autoFocus required
                       onChange={(e) => setAuthor({
                         ...author,
                         name: e.target.value,
                         photoUrl: `https://avatars.dicebear.com/api/initials/${e.target.value.replace(" ", "+")}.svg`
                       })}/>
            <TextField name="description" label="Description" value={author.description} multiline
                       rows={2}
                       maxRows={4}
                       onChange={(e) => setAuthor({...author, description: e.target.value})}
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

            <br/>
            <Box textAlign="center">
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateAuthor : handleAddAuthor}
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

AuthorForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  author: PropTypes.object,
  setAuthor: PropTypes.func,
  handleAddAuthor: PropTypes.func,
  handleUpdateAuthor: PropTypes.func
};

export default AuthorForm
