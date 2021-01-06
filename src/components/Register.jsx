import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "../service/axios";

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

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password && email) {
      const registerDTO = { username, password, email };
      console.log(username + " " + password + " " + email);
      console.log(registerDTO);

      axios
        .post("/users/register", registerDTO)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      setUsername("");
      setPassword("");
      setPassword("");
    } else {
      console.log("Empty Values");
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <h3>You don't have account?</h3>
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
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleRegister}
            className={classes.button}
          >
            Register for free!
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default Register;
