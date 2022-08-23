import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="mx-8">
      <ul className="flex h-16 bg-neutral-200 rounded-full space-between">
        <li className="w-full h-full flex justify-center items-center">
          <Link to="/">Home</Link>
        </li>
        <li className="w-full h-full flex justify-center items-center">
          <Link to="/foods">Food</Link>
        </li>
        <li className="w-full h-full flex justify-center items-center">
          <Link to="/stats">Stats</Link>
        </li>
        <li className="w-full h-full flex justify-center items-center">
          <Link to="/stats">User</Link>
        </li>
      </ul>
    </nav>
  );
}
