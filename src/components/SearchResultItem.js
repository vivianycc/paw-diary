import React from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import { Plus, Check } from "react-feather";

const StyledItem = styled.li`
  padding: 16px;
  border: 1px solid var(--neutral-200);
  border-radius: 16px;
  list-style: none;
  position: relative;

  button {
    padding: 6px 12px;
    border: ${(props) =>
      props.disabled ? "transparent" : "1px solid var(--neutral-700)"};
    border-radius: 8px;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: ${(props) =>
      props.disabled ? "var(--neutral-300)" : "var(--neutral-700)"};
    background: ${(props) => console.log(props)};
  }
`;
export default function SearchResultItem({
  food,
  onClick,
  disabled,
  actionLabel,
}) {
  console.log(food);
  return (
    <StyledItem disabled={disabled}>
      <p>{food.brand}</p>
      <p>{food.flavor}</p>
      <button onClick={onClick}>{disabled ? "已加入" : actionLabel}</button>
    </StyledItem>
  );
}
