import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import PropTypes from "prop-types";

const BorrowalsDialog = ({isDialogOpen, handleCloseDialog, borrowalsId, handleDeleteBorrowals}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirm action
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this borrowals?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={() => handleDeleteBorrowals(borrowalsId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

BorrowalsDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  borrowalsId: PropTypes.string,
  handleDeleteBorrowals: PropTypes.func
};

export default BorrowalsDialog
