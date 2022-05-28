import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import Paper from "../Paper";

export default function FvDialog(props) {
  const [text, setText] = useState("");

  const handleClose = () => {
    props.handleClose();
  };

  const handleConfirm = () => {
    if (props.setConfirm) {
      props.setConfirm(text);
      setText("");
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open || false}
        PaperComponent={Paper}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>{props.message}</b>
          </DialogContentText>
          {props.type === 2 ? (
            <TextField
              {...props.inputProps}
              onChange={(e) => setText(e.target.value)}
              value={text}
              maskprops={{
                mask: Number,
              }}
              fullWidth
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          {[2, 0].indexOf(props.type) > -1 ? (
            <Button onClick={handleConfirm} color="primary">
              Ok
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                Não
              </Button>
              <Button onClick={handleConfirm} color="primary">
                Sim
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
