import { makeStyles, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/axios";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    margin: "0.5rem",
  },
});
function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    async function getUser() {
      const user = await axios.get("users/" + id);
      setUser(user.data);
    }
    getUser();
  }, [id]);

  return (
    <Paper className={classes.root}>
      <h3>Profile: {user.username}</h3>
      <h4>Email: {user.email}</h4>
    </Paper>
  );
}

export default UserProfile;
