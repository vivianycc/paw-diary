import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(prop) => prop.size + "px" || "48"};
  width: ${(prop) => prop.size + "px" || "48"};
  outline: none;
  border: none;
  border-radius: 100%;
  background-color: ${(props) => props.color || "var(--neutral-700)"};
  color: ${(props) => props.strokeColor || "var(--neutral-700)"};
`;
export default function IconButton({
  className,
  size = "48",
  onClick,
  color = "var(--neutral-700)",
  strokeColor = "#FFF",
  icon,
}) {
  return (
    <StyledButton
      className={className}
      size={size}
      onClick={onClick}
      color={color}
      strokeColor={strokeColor}
    >
      {icon}
    </StyledButton>
  );
}
