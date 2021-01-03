import React, { useState, useEffect } from "react";
import axios from "../service/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

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
          <div key={username}>
            <h3>User: {username} </h3>
            <h4>Email: {email} </h4>
          </div>
        );
      })}
    </>
  );
};

export default Users;
