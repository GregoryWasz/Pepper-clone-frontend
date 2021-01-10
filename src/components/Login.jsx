import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "../service/axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
  const { setIsLoggedIn, getCookieValue, isLoggedIn } = useContext(UserContext);
  const classes = useStyles();
  let history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    const loginDto = { username, password };

    if (!isLoggedIn) {
      await axios
        .post("/login", loginDto)
        .then(() => {
          setIsLoggedIn(true);
          getCookieValue();
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("You already logged in!");
    }

    setUsername("");
    setPassword("");
  }

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
