import React, { useState, useEffect } from "react";
import axios from "../service/axios";

export default function Role() {
  const [roles, setRoles] = useState([]);

  async function getRoles() {
    const roles = await axios
      .get("roles", { withCredentials: true })
      .then(setRoles(roles.data))
      .catch(console.log("Bad Kitty!"));
    return roles;
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      {roles.map((role) => {
        const { roleId, roleName } = role;
        return (
          <div key={roleId}>
            <h2>ID: {roleId}</h2>
            <h3>Name: {roleName} </h3>
          </div>
        );
      })}
    </div>
  );
}
