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
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
`;
export default function SearchResultItem(props) {
  console.log(props);
  return (
    <StyledItem>
      <p>{props.brand}</p>
      <p>{props.flavor}</p>
      <IconButton
        onClick={props.onClick}
        color={props.disabled ? "var(--neutral-200)" : "var(--neutral-400)"}
      >
        {props.disabled ? <Check /> : <Plus />}
      </IconButton>
    </StyledItem>
  );
}
