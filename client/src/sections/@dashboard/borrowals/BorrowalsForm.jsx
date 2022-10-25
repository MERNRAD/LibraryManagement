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


          <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="member-label">Author</InputLabel>
              <Select
                labelId="member-label"
                id="member"
                value={borrowals.memberId}
                label="Member"
                onChange={(e) => setBorrowals({ ...borrowals, memberId: e.target.value })}>


                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="borrowals-label">Genre</InputLabel>
              <Select
                labelId="borrowals-label"
                id="borrowals"
                value={borrowals.member}
                label="Borrowals"
                onChange={(e) => setBorrowals({ ...borrowals, borrowals: e.target.value })}>


                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField name="borrowedDate" type="date" label="Borrowed Date" value={borrowals.borrowedDate} autoFocus required
                       onChange={(e) => setBorrowals({...borrowals, borrowedDate: e.target.value})}/>
            <TextField name="dueDate" type="date" label="Due Date" value={borrowals.dueDate} 
                       onChange={(e) => setBorrowals({...borrowals, dueDate: e.target.value})}
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
