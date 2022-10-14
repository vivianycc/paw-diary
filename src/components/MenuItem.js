import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  outline: none;
  border: none;
  background-color: transparent;
  .icon {
    border-radius: 16px;
    padding: 20px;
    background-color: var(--neutral-100);
  }
`;

export default function MenuItem({ icon, label, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <div className="icon"> {icon}</div>
      <p>{label}</p>
    </StyledButton>
  );
}
