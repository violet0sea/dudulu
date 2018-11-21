import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Index from '@/pages/Index';
import './App.css';

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const styles = (theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" >
              News
            </Typography>
            <Button color="inherit">Operation</Button>
          </Toolbar>
        </AppBar>
        <Router>
          <div>
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

