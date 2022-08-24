import styled from "styled-components";

const StyledButton = styled.button`
  height: ${(prop) => prop.size + "px" || "48px"};
  width: ${(prop) => prop.size + "px" || "48px"};
  outline: none;
  border: none;
  border-radius: 100%;
  background-color: var(--neutral-700);
  color: white;
`;
export default function IconButton({ className, children, size }) {
  console.log(size);

  return (
    <StyledButton className={className} size={size}>
      {children}
    </StyledButton>
  );
}
