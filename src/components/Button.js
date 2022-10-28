import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 16px;
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.bgColor || "var(--neutral-700)"};
  border-radius: 22px;
  outline: none;
  border: transparent;
  font-size: 14px;
`;

// const Primary = styled(StyledButton)`
//   color: "#fff";
//   background-color: "var(--neutral-700)";
// `;

// export const Secondary = styled(StyledButton)`
//   color: "var(--neutral-700)";
//   background-color: "var(--neutral-300)";
// `;

export default function Button({
  label,
  onClick,
  className,
  color,
  bgColor,
  type,
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      className={className}
      color={color}
      bgColor={bgColor}
    >
      {label}
    </StyledButton>
  );
}
