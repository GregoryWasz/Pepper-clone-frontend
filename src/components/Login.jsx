import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "../service/axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    margin: "0.5rem",
    justifyContent: "center",
    display: "flex",
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
  alert: { margin: "0.5rem" },
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, getCookieValue, isLoggedIn } = useContext(UserContext);
  const [isError, setIsError] = useState(false);
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
        .catch(() => {
          setIsError(true);
        });
    } else {
      console.log("You already logged in!");
    }

    setUsername("");
    setPassword("");
  }

  return (
    <>
      {isError && (
        <Alert className={classes.alert} severity="error">
          Bad Credentials
        </Alert>
      )}

      <Paper className={classes.root}>
        <form>
          <Typography align="center" variant="h4">
            Login
          </Typography>

          <TextField
            className={classes.textField}
            size="small"
            id="username"
            type="text"
            label="Username"
            variant="outlined"
            fullWidth={true}
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
            fullWidth={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            className={classes.button}
            fullWidth={true}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to="/register"
            fullWidth={true}
          >
            I need account!
          </Button>
        </form>
      </Paper>
    </>
  );
}
