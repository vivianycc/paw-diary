import React from "react";
import styled from "styled-components";
import { Avatar } from "@geist-ui/core";
import dayjs from "dayjs";

const StyledPet = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 24px;
  background-color: ${(props) => (props.bg ? "#fff" : "transparent")};

  .pet-avatar.avatar {
    height: 48px;
    width: 48px;
  }
  .pet-content {
    text-align: left;
  }
  .pet-name {
    margin-bottom: 4px;
    font-size: 16px;
    text-align: left;
    color: var(--neutral-700);
  }
  .pet-info {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--neutral-500);
    span + span {
      :before {
        content: "∙";
        padding: 0 8px;
      }
    }
  }
  .avatar-group.other-pet-avatar {
    margin-left: auto;
  }
`;

export default function petItem({ pet, onClick, className, bg }) {
  const {
    name,
    species,
    weight,
    birthday,
    photoUrl = "http://placekitten.com/100/100",
  } = pet;

  const speciesName = {
    cat: "貓",
    dog: "狗",
  };
  const displayAge = (birthday) => {
    if (birthday) {
      const totalMonths = dayjs().diff(dayjs(birthday), "month");
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths - years * 12;

      return `${years} 歲 ${months} 個月`;
    } else {
      return "沒有資料";
    }
  };

  return (
    <StyledPet onClick={onClick} className={className} bg={bg}>
      <Avatar src={photoUrl} className="pet-avatar" />
      <div className="pet-content">
        <span className="pet-name">{name}</span>
        <span className="pet-info">
          <span>{speciesName[species]}</span>
          {birthday && <span>{displayAge(birthday)}</span>}
          {weight && <span>{weight} kg</span>}
        </span>
      </div>
    </StyledPet>
  );
}
