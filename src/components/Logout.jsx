import React from "react";
import axios from "../service/axios";

export default function logout() {
  async function logoutHandler() {
    await axios.post("logout");
    console.log("Logout ");
  }
  return (
    <React.Fragment>
      <button onClick={logoutHandler}>LOGOUT</button>
    </React.Fragment>
  );
}
