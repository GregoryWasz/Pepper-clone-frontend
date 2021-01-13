import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../service/axios";
import { UserContext } from "./UserContext";

const useStyles = makeStyles({
  root: {
    margin: "0.5rem",
    padding: "0.5rem",
  },
});
function MyAccount() {
  const {
    currentUserId,
    setCurrentUserId,
    setCurrentUsername,
    setIsLoggedIn,
  } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  async function handleDeleteAccount() {
    await axios.delete("users/").then(async () => {
      setIsLoggedIn(false);
      setCurrentUserId("");
      setCurrentUsername("");
      history.push("/");
    });
  }

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
      <Button onClick={handleDeleteAccount}> Delete Account</Button>
      {/* <Button> Change Email</Button>
      <Button> Change Username</Button>
      <Button> Change Password</Button>
      */}
    </Paper>
  );
}

export default MyAccount;
