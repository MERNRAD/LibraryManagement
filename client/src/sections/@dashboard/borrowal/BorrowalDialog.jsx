import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const BorrowalDialog = ({isDialogOpen, handleCloseDialog, borrowalId, handleDeleteBorrowal}) =>
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
          Are you sure you want to delete this borrowal?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={() => handleDeleteBorrowal(borrowalId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

BorrowalDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  borrowalId: PropTypes.string,
  handleDeleteBorrowal: PropTypes.func
};

export default BorrowalDialog
