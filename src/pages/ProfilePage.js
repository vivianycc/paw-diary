import React from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Button from "../components/Button";
import PetItem from "../components/PetItem";

const StyledPage = styled.div`
  height: 100vh;
  padding: 72px 24px 0;
  background-color: var(--neutral-100);
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
    padding: 40px 24px;
    position: relative;
    background-color: #fff;
    border-radius: 24px;
  }
  .avatar {
    height: 72px;
    width: 72px;
    border-radius: 100%;
    background-color: var(--neutral-300);
    position: absolute;
    top: -36px;
  }
  .name {
    font-size: 18px;
    color: var(--neutral-700);
  }
  .email {
    font-size: 14px;
    color: var(--neutral-500);
  }
`;

export default function ProfilePage() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => navigate("/login"));
  };

  const handleCreatePet = () => {
    navigate("/pets/create");
  };

  return (
    <StyledPage>
      <div className="user-info">
        <div className="avatar"></div>
        <h1 className="name">{user.displayName || user.email.split("@")[0]}</h1>
        <p className="email">{user.email}</p>
      </div>

      <Button
        onClick={handleCreatePet}
        label="新增寵物"
        color="var(--neutral-700)"
        bgColor="var(--neutral-200)"
      />
      <Nav />
      <Button onClick={handleLogOut} label="Log Out" />
    </StyledPage>
  );
}
