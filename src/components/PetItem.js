import React from "react";
import styled from "styled-components";
import { Avatar } from "@geist-ui/core";

const StyledPet = styled.button`
  display: flex;
  align-items: center;
  padding: 16px;
  border: none;
  background-color: transparent;

  .pet-avatar.avatar {
    height: 48px;
    width: 48px;
  }
  span {
    display: block;
    margin-left: 16px;
  }
  .pet-name {
    margin-bottom: 4px;
    font-size: 16px;
    text-align: left;
    color: var(--neutral-700);
  }
  .pet-info {
    font-size: 14px;
    color: var(--neutral-500);
  }
  .avatar-group.other-pet-avatar {
    margin-left: auto;
  }
`;

export default function petItem({ pet, onClick, className }) {
  console.log(pet);
  const {
    info: { name, weight, age, photoUrl },
  } = pet;

  return (
    <StyledPet onClick={onClick} className={className}>
      <Avatar src={photoUrl} className="pet-avatar" />
      <div>
        <span className="pet-name">{name}</span>
        <span className="pet-info">{`${age} • ${weight}kg`}</span>
      </div>
    </StyledPet>
  );
}
