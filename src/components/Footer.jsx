import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#1c2020",
    color: "#8e9399",
    alignItems: "center",
    justify: "center",
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.footer}>
        <Toolbar>
          <Container fixed>
            <Grid container>Created by Grzegorz Waszkowski</Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;
