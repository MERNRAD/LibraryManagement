import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";

const AuthorDialog = ({isDialogOpen, handleCloseDialog, authorId, handleDeleteAuthor}) => <Dialog
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
          Are you sure you want to delete this author?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={() => handleDeleteAuthor(authorId)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>

AuthorDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  authorId: PropTypes.string,
  handleDeleteAuthor: PropTypes.func
};

export default AuthorDialog
