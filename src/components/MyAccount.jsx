import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import { UserContext } from "./UserContext";

const useStyles = makeStyles({
  root: {
    margin: "0.5rem",
    padding: "0.5rem",
  },
});
function MyAccount() {
  const { currentUserId } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    async function getCurrentUser() {
      const user = await axios.get("users/" + currentUserId).then();
      setUser(user.data);
    }
    getCurrentUser();
  }, [currentUserId]);

  return (
    <Paper className={classes.root}>
      <Typography> Hello {user.username}</Typography>

      <Typography>Your user pannel:</Typography>

      {/* <Button> Change Email</Button>
      <Button> Change Username</Button>
      <Button> Change Password</Button>
      <Button> Delete Account</Button> */}
    </Paper>
  );
}

export default MyAccount;
