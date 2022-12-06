import React, { useState } from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Avatar, Drawer } from "@geist-ui/core";
import PetItem from "../components/PetItem";
import { usePets } from "../hooks/usePets";
import { useAuth } from "../hooks/useAuth";
import useCurrentPet from "../hooks/useCurrentPet";
import { useEffect } from "react";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  padding: 32px;
  overflow: hidden;
  background-color: var(--neutral-100);

  main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    padding-bottom: 64px;
    position: relative;
  }
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
  .copyright {
    visibility: hidden;
  }

  @media only screen and (min-width: 625px) {
    flex-direction: row-reverse;
    gap: 24px;
    main {
      flex: 1;
    }
    aside {
      height: 100%;
    }
    .copyright {
      visibility: visible;
      font-size: 12px;
      color: var(--neutral-500);
    }
  }
  @media only screen and (min-width: 1200px) {
    /* background: #000; */
    max-width: 1200px;
    margin: 0 auto;
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
  console.log(currentPet);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pets && !currentPet) {
      setCurrentPet(Object.keys(pets)[0]);
    }
  }, [pets, currentPet]);

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
        尚未建立寵物資料，前往 <Link to="/pets/create">建立寵物</Link>
      </div>
    );
  };
  const Loading = () => {
    return <div>Loading...</div>;
  };
  if (pets === null || pets === undefined || !currentPet) {
    return <Loading />;
  }
  return (
    <StyledPage className="home">
      {pets !== null && Object.keys(pets).length === 0 ? (
        renderNoPets()
      ) : (
        <>
          <main>
            {pathname !== "/profile" && (
              <div className="pet-area">
                <PetItem pet={pets[currentPet]} className="current-pet" />
                <PetMenu
                  currentPet={currentPet}
                  pets={pets}
                  onClick={() => setShowDrawer(true)}
                />
              </div>
            )}
            <Outlet context={currentPet} className="outlet" />
            <Drawer
              visible={showDrawer}
              onClose={() => setShowDrawer(false)}
              placement="bottom"
            >
              {renderPets()}
            </Drawer>
          </main>
          <aside>
            <Nav />
            <p className="copyright">Copyright © 2022 Tale App</p>
          </aside>
        </>
      )}
    </StyledPage>
  );
}
