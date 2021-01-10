import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/axios";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getUser() {
      const user = await axios.get("users/" + id);
      setUser(user.data);
    }
    getUser();
  }, [id]);
  return (
    <>
      <h3>User: {user.username}</h3>
      <h4>Email: {user.email}</h4>
    </>
  );
}

export default UserProfile;
