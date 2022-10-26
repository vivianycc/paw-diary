import React from "react";
import styled from "styled-components";
const StyledRadio = styled.input`
  accent-color: var(--neutral-700);
  transform: scale(1.5);
  margin: 8px;
`;
const StyledRadioBtns = styled.div`
  display: flex;
  gap: 24px;
  color: var(--neutral-700);
`;

export default function RadioButton({ label, value, onChange, name, checked }) {
  return (
    <div>
      <StyledRadio
        type="radio"
        name={name}
        id={String(value)}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={String(value)}>{label}</label>
    </div>
  );
}

function RadioGroup({ children }) {
  return <StyledRadioBtns>{children}</StyledRadioBtns>;
}

RadioButton.Group = RadioGroup;
