import React from "react";
import { useAuth } from "../hooks/useAuth";
import Nav from "../components/Nav";
import styled from "styled-components";

const StyledPage = styled.div`
  background-color: var(--neutral-100);
`;

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <StyledPage>
      <Nav />
      {user && <h1>Hello!,{user.email}</h1>}
    </StyledPage>
  );
}
