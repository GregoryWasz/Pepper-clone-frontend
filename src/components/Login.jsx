import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "../service/axios";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    padding: "1rem",
    margin: "0.5rem",
  },
  textField: { margin: "0.4rem" },
  button: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    margin: "0.4rem",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      const loginDTO = { username, password };
      console.log(username + " " + password);
      console.log(loginDTO);

      axios
        .post("/login", loginDTO)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      setUsername("");
      setPassword("");
    } else {
      console.log("Empty Values");
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <h3>Login form</h3>
        <form>
          <TextField
            className={classes.textField}
            size="small"
            id="username"
            type="text"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.textField}
            size="small"
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            className={classes.button}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to="/register"
          >
            I need account!
          </Button>
        </form>
      </Paper>
    </>
  );
}
