import styled from "styled-components";

const StyledButton = styled.button`
  height: ${(prop) => prop.size + "px" || "48"};
  width: ${(prop) => prop.size + "px" || "48"};
  outline: none;
  border: none;
  border-radius: 100%;
  background-color: ${(props) => props.color || "var(--neutral-700)"};
  color: white;
`;
export default function IconButton({
  className,
  children,
  size = "48",
  onClick,
  color = "var(--neutral-700)",
}) {
  return (
    <StyledButton
      className={className}
      size={size}
      onClick={onClick}
      color={color}
    >
      {children}
    </StyledButton>
  );
}
