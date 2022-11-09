import styled, { useTheme, css } from "styled-components";

const variantStyles = (theme, variant = "primary") => {
  return {
    primary: css`
      color: ${theme.colors.onPrimary};
      background: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
    `,
    secondary: css`
      color: ${theme.colors.onSecondary};
      background: ${theme.colors.secondary};
      border: 1px solid ${theme.colors.secondary};
    `,
    outlined: css`
      color: ${theme.colors.primary};
      background: transparent;
      border: 1px solid ${theme.colors.primary};
    `,
    transparent: css`
      color: ${theme.colors.secondary};
      background-color: transparent;
      border: 1px solid transparent;
      button &:hover {
        background-color: var(--neutral-50);
      }
    `,
  }[variant];
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(prop) => prop.size + "px" || "48"};
  width: ${(prop) => prop.size + "px" || "48"};
  outline: none;
  border: none;
  border-radius: 100%;

  ${({ theme, variant }) => variantStyles(theme, variant)}
`;
export default function IconButton({
  className,
  size = "48",
  onClick,
  icon,
  variant,
}) {
  const theme = useTheme();
  return (
    <StyledButton
      className={`${className || ""} icon-button`}
      size={size}
      onClick={onClick}
      theme={theme}
      variant={variant}
    >
      {icon}
    </StyledButton>
  );
}
