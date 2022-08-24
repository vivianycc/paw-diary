import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Heart, TrendingUp, User } from "react-feather";
import styled from "styled-components";

const StyledNav = styled.nav`
  margin: 0 32px;
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  ul {
    border-radius: 32px;
    display: flex;
    height: 64px;
    background-color: var(--neutral-200);
  }
  li {
    width: 100%;
    height: 100%;
    list-style-type: none;
    padding: 8px 16px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 1000px;
    color: var(--neutral-700);
  }
  a:hover {
    background-color: var(--neutral-300);
  }
  a.active {
    background-color: var(--neutral-700);
    color: white;
  }
`;

export default function Nav() {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink to="/">
            <Home />
          </NavLink>
        </li>
        <li>
          <NavLink to="/foods">
            <Heart />
          </NavLink>
        </li>
        <li>
          <NavLink to="/stats">
            <TrendingUp />
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <User />
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
}
