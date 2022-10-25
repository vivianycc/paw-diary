import React from "react";
import { useAuth } from "../hooks/useAuth";
import Nav from "../components/Nav";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledPage = styled.div`
  background-color: var(--neutral-100);
`;

export default function ProfilePage() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => navigate("/login"));
  };

  return (
    <StyledPage>
      <Nav />
      {user && <h1>Hello!,{user.email}</h1>}
      <button onClick={handleLogOut}>Log Out</button>
    </StyledPage>
  );
}
