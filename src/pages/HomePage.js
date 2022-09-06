import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { Avatar } from "@geist-ui/core";
import CatImg1 from "../assets/cat1.jpeg";
import CatImg2 from "../assets/cat2.jpeg";

const StyledPage = styled.div`
  height: 100vh;
  padding: 32px;
  overflow: hidden;
  background-color: var(--neutral-100);
`;
const StyledCurrentPet = styled.div`
  display: flex;
  align-items: center;
  .current-pet-avatar.avatar {
    height: 48px;
    width: 48px;
  }
  span {
    display: block;
    margin-left: 16px;
  }
  .current-pet-name {
    margin-bottom: 4px;
    font-size: 16px;
    color: var(--neutral-700);
  }
  .current-pet-info {
    font-size: 14px;
    color: var(--neutral-500);
  }
  .avatar-group.other-pet-avatar {
    margin-left: auto;
  }
`;

const CurrentPet = ({
  name = "Canele",
  age = "13 months",
  weight = "4.0kg",
}) => {
  return (
    <StyledCurrentPet>
      <Avatar src={CatImg1} className="current-pet-avatar" />
      <div>
        <span className="current-pet-name">{name}</span>
        <span className="current-pet-info">{`${age} • ${weight}`}</span>
      </div>
      <Avatar.Group className="other-pet-avatar">
        <Avatar src={CatImg2} stacked />
        <Avatar src={CatImg1} stacked />
      </Avatar.Group>
    </StyledCurrentPet>
  );
};
export default function HomePage() {
  return (
    <StyledPage>
      <CurrentPet />
      <Nav />
      <Outlet />
    </StyledPage>
  );
}
