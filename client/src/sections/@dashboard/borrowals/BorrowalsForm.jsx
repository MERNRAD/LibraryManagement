import {Box, Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

const BorrowalsForm = ({
                      isUpdateForm,
                      isModalOpen,
                      handleCloseModal,
                      borrowals,
                      setBorrowals,
                      handleAddBorrowals,
                      handleUpdateBorrowals
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
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} borrowals
          </Typography>
          <Stack spacing={3} paddingY={2}>

            <TextField name="name" label="Borrowals name" value={borrowals.name} autoFocus required
                       onChange={(e) => setBorrowals({...borrowals, name: e.target.value})}/>
            <TextField name="description" label="Description" value={borrowals.description} multiline
                       rows={2}
                       maxRows={4}
                       onChange={(e) => setBorrowals({...borrowals, description: e.target.value})}
            />

            <br/>
            <Box textAlign="center">
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateBorrowals : handleAddBorrowals}
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

BorrowalsForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  borrowals: PropTypes.object,
  setBorrowals: PropTypes.func,
  handleAddBorrowals: PropTypes.func,
  handleUpdateBorrowals: PropTypes.func
};

export default BorrowalsForm
