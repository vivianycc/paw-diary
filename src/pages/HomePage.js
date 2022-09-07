import React, { useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { Avatar, Drawer } from "@geist-ui/core";
import PetItem from "../components/PetItem";

const StyledPage = styled.div`
  height: 100vh;
  padding: 32px;
  overflow: hidden;
  background-color: var(--neutral-100);

  .pet-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .current-pet {
    padding: 0;
  }
  .pet-menu {
    cursor: pointer;
    outline: none;
    border: none;
  }
`;

const PetMenu = ({ currentPet, pets, onClick }) => {
  function getOtherPetsPhoto() {
    let photoUrls = [];
    for (let pet in pets) {
      if (pet !== currentPet) {
        photoUrls.push(pets[pet].info.photoUrl);
      }
    }
    return photoUrls;
  }
  const avatars = getOtherPetsPhoto();
  return (
    <button className="pet-menu" onClick={onClick}>
      <Avatar.Group>
        {avatars.map((url) => (
          <Avatar src={url} stacked />
        ))}
      </Avatar.Group>
    </button>
  );
};
export default function HomePage(props) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { pets, switchPet, currentPet } = props;
  const handleCurrentPet = (pet) => {
    setShowDrawer(false);
    switchPet(currentPet, pet);
  };

  const renderPets = () => {
    let arr = [];
    for (let pet in pets) {
      arr.push(
        <PetItem pet={pets[pet]} onClick={() => handleCurrentPet(pet)} />
      );
    }
    return arr;
  };
  return (
    <StyledPage>
      <div className="pet-area">
        <PetItem pet={pets[currentPet]} className="current-pet" />
        <PetMenu
          currentPet={currentPet}
          pets={pets}
          onClick={() => setShowDrawer(true)}
        />
      </div>
      <Nav />
      <Outlet />

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        placement="bottom"
      >
        {renderPets()}
      </Drawer>
    </StyledPage>
  );
}
