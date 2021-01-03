import React, { useState } from "react";
import axios from "../service/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      const loginDTO = { username, password };
      console.log(username + " " + password);
      console.log(loginDTO);

      axios
        .post("/login", loginDTO)
        .then((response) => {
          console.log(response);
          setMessage("Successfully logged IN");
        })
        .catch((error) => {
          console.log(error);
          setMessage("Bad login creds");
        });

      setUsername("");
      setPassword("");
    } else {
      console.log("Empty Values");
    }
  };

  return (
    <>
      {message}
      <form>
        <div>
          <label>Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label>Password: </label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={handleLogin}>login</button>
        </div>
      </form>
    </>
  );
}
