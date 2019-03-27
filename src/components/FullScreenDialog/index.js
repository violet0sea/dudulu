import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"

import "./index.scss"

function Transition(props) {
  return <Slide direction="up" {...props} />
}

function FullScreenDialog(props) {
  const { open, closeDialog, saveText, children } = props

  function handleSave() {
    saveText()
  }

  function handleClose() {
    if (typeof closeDialog === "function") {
      closeDialog()
    }
  }

  return (
    <Dialog
      className="fullscreen-dialog"
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Sound
          </Typography>
          <Button color="inherit" onClick={handleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  )
}

export default FullScreenDialog
