import React from "react";
import styled from "styled-components";

const StyledFoodInput = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  /* border: 1px solid red; */
  padding: 4px 0;
  font-size: 14px;
  color: var(--neutral-700);
`;
const StyledInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--neutral-100);
  text-align: right;
  padding: 12px;
  &:focus {
    border-bottom: 1px solid var(--neutral-500);
  }
  &:hover {
    border-bottom: 1px solid var(--neutral-300);
  }
  &::placeholder {
    color: var(--neutral-300);
  }
`;
const StyledLabel = styled.label`
  margin-bottom: 0;
`;

export default function FoodInput({
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  ...props
}) {
  return (
    <StyledFoodInput>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </StyledFoodInput>
  );
}
