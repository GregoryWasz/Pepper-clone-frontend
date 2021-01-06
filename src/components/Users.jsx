import { makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "../service/axios";

const useStyles = makeStyles({
  root: { padding: "0.2rem", margin: "0.25rem" },
});

const Users = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  async function getUsers() {
    const users = await axios.get("users");
    setUsers(users.data);
    return users;
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {users.map((user) => {
        const { username, email } = user;
        return (
          <Paper key={username} className={classes.root}>
            <h3>User: {username} </h3>
            <h4>Email: {email} </h4>
          </Paper>
        );
      })}
    </>
  );
};

export default Users;
