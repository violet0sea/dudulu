import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Header from "./Header";
import Index from "@/pages/Index";
import Css from "@/pages/Css";
import "./App.css";

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const styles = theme =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing.unit * 20
    }
  });

class App extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };
  render() {
    const { open } = this.state;
    const sideList = (
      <div>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <div className="App">
        <Header>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" color="inherit">
              News
            </Typography> */}
            {/* <Button color="inherit">Operation</Button> */}
          </Toolbar>
        </Header>
        <Drawer open={open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
        <Router>
          <main className="main">
            <Route path="/" exact component={Index} />
            <Route path="/css/" component={Css} />
            {/* <Route path="/users/" component={Users} /> */}
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
