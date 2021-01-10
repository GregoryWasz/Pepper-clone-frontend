import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import { UserContext } from "./UserContext";

function MyAccount() {
  const { currentUserId } = useContext(UserContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getCurrentUser() {
      const user = await axios.get("users/" + currentUserId).then();
      setUser(user.data);
    }
    getCurrentUser();
  }, [currentUserId]);

  return (
    <>
      Hello {user.username} Change Username, Change Password, Change Email
      address
    </>
  );
}

export default MyAccount;
