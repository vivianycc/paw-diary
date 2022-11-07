import React, { useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Outlet, Link } from "react-router-dom";
import { Avatar, Drawer } from "@geist-ui/core";
import PetItem from "../components/PetItem";
import { usePets } from "../hooks/usePets";
import { useAuth } from "../hooks/useAuth";
import useCurrentPet from "../hooks/useCurrentPet";
import { useEffect } from "react";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
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
        const url = pets[pet].photoUrl || "http://placekitten.com/100/100";
        photoUrls.push(url);
      }
    }
    return photoUrls;
  }
  const avatars = getOtherPetsPhoto();
  return (
    <button className="pet-menu" onClick={onClick}>
      <Avatar.Group>
        {avatars.map((url, i) => (
          <Avatar src={url} stacked key={i} />
        ))}
      </Avatar.Group>
    </button>
  );
};
export default function HomePage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { user } = useAuth();
  const { pets } = usePets(user.uid);
  const { setCurrentPet, currentPet } = useCurrentPet();

  useEffect(() => {
    if (pets && currentPet === "") {
      setCurrentPet(Object.keys(pets)[0]);
    }
  }, [pets]);

  const handleCurrentPet = (pet) => {
    setCurrentPet(pet);
    setShowDrawer(false);
  };

  const renderPets = () => {
    let arr = [];
    for (let pet in pets) {
      arr.push(
        <PetItem
          pet={pets[pet]}
          key={pet}
          onClick={() => handleCurrentPet(pet)}
        />
      );
    }
    return arr;
  };
  const renderNoPets = () => {
    return (
      <div>
        尚未建立寵物資料，前往 <Link to="/profile">個人頁建立寵物</Link>
      </div>
    );
  };
  const Loading = () => {
    return <div>Loading...</div>;
  };
  if (pets === null || currentPet === "") {
    return <Loading />;
  }
  return (
    <StyledPage>
      {pets !== null && Object.keys(pets).length === 0 ? (
        renderNoPets()
      ) : (
        <>
          <div className="pet-area">
            <PetItem pet={pets[currentPet]} className="current-pet" />
            <PetMenu
              currentPet={currentPet}
              pets={pets}
              onClick={() => setShowDrawer(true)}
            />
          </div>
          <Nav />
          <Outlet context={currentPet} />
          <Drawer
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            placement="bottom"
          >
            {renderPets()}
          </Drawer>
        </>
      )}
    </StyledPage>
  );
}
