import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Button from "../components/Button";
import PetItem from "../components/PetItem";
import { getFirebase } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const StyledPage = styled.div`
  height: 100vh;
  padding: 72px 24px 0;
  background-color: var(--neutral-100);
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 40px 0 16px;
    padding: 40px 24px;
    position: relative;
    background-color: #fff;
    border-radius: 24px;
  }
  .user-avatar {
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
  .pet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    h2 {
      font-size: 18px;
      font-weight: 400;
    }
  }
  .pets-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { firestore } = getFirebase();
  const petCol = collection(firestore, "users", user.uid, "pets");

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(petCol, (snapshot) => {
      const arr = snapshot.docs.map((doc) => doc.data());
      setPets(arr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    logout().then(() => navigate("/login"));
  };

  const handleCreatePet = () => {
    navigate("/pets/create");
  };

  return (
    <StyledPage>
      <div className="user-info">
        <div className="user-avatar"></div>
        <h1 className="name">{user.displayName || user.email.split("@")[0]}</h1>
        <p className="email">{user.email}</p>
      </div>

      <div className="pet-header">
        <h2>我的寵物</h2>
        <Button
          onClick={handleCreatePet}
          label="新增寵物"
          color="var(--neutral-700)"
          bgColor="var(--neutral-200)"
        />
      </div>
      <div className="pets-body">
        {pets.map((pet) => (
          <PetItem key={pet.name} pet={pet} bg />
        ))}
      </div>
      <Nav />
      <Button onClick={handleLogout} label="Log Out" />
    </StyledPage>
  );
}
