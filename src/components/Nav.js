import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/foods">Food</NavLink>
        </li>
        <li>
          <NavLink to="/stats">Stats</NavLink>
        </li>
        <li>
          <NavLink to="/stats">User</NavLink>
        </li>
      </ul>
    </nav>
  );
}
