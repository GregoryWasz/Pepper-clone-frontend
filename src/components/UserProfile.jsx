import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/axios";

const useStyles = makeStyles({
  root: {
    margin: "0.5rem",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: { margin: "0.5rem" },
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
      <Typography className={classes.text} variant="h4">
        Profile: {user.username}
      </Typography>
      <Typography className={classes.text} variant="h5">
        Email: {user.email}
      </Typography>
    </Paper>
  );
}

export default UserProfile;
