import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { Button, Container, Icon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  header: { backgroundColor: "#34383b" },
  submit: {
    backgroundColor: "#ff7900",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff7900",
    },
  },

  login: {
    backgroundColor: "#000",
    color: "white",
    marginRight: "0.5rem",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#000",
    },
  },

  logo: {
    color: "#fff",
    textDecoration: "none",
    padding: "1.3rem",
    "&:hover": {
      backgroundColor: "#575757",
    },
  },
});

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root} s>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Container fixed>
            <Grid container alignItems="center">
              <Grid item component={Link} to={"/"} className={classes.logo}>
                SUPER LOGO
              </Grid>
              <Grid
                item
                component={Link}
                to={"/users"}
                className={classes.logo}
              >
                Our Team
              </Grid>
              <Grid
                item
                component={Link}
                to={"/roles"}
                className={classes.logo}
              >
                Roles
              </Grid>
              <Grid item xs></Grid>
              <Grid item>
                <Button
                  className={classes.login}
                  size="medium"
                  component={Link}
                  to={"/login"}
                >
                  <Icon>
                    <PersonIcon></PersonIcon>
                  </Icon>
                  Register / Log in
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.login}
                  size="medium"
                  component={Link}
                  to={"/logout"}
                >
                  <Icon>
                    <ExitToAppIcon></ExitToAppIcon>
                  </Icon>
                  Logout
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.submit} size="medium">
                  <Icon>
                    <AddIcon></AddIcon>
                  </Icon>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
