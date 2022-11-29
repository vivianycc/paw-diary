import React from "react";
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
    disabled: css`
      color: ${theme.colors.onPrimary};
      background: ${theme.colors.primary};
      border: 1px solid transparent;
      opacity: 0.4;
    `,
    warning: css`
      color: ${theme.colors.warning};
      background: ${theme.colors.secondary};
      border: 1px solid transparent;
    `,
  }[variant];
};

const sizeStyles = (size = "m") => {
  return {
    s: css`
      padding: 6px 10px;
      font-size: 12px;
    `,
    m: css`
      padding: 10px 16px;
      font-size: 14px;
    `,
    l: css`
      padding: 14px 20px;
      font-size: 16px;
      border-radius: 25px;
    `,
  }[size];
};

const StyledButton = styled.button`
  padding: 10px 16px;
  border-radius: 22px;
  outline: none;
  border: transparent;
  color: "#fff";
  background-color: "var(--neutral-700)";
  font-size: 14px;

  ${({ theme, variant }) => variantStyles(theme, variant)}
  ${({ size }) => sizeStyles(size)}
`;

const StyledBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  .button {
    flex: 1;
  }
`;

export default function Button({
  label,
  onClick,
  className,
  type,
  variant,
  size,
}) {
  const theme = useTheme();
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      className={`button ${className || ""}`}
      variant={variant}
      theme={theme}
      size={size}
    >
      {label}
    </StyledButton>
  );
}

function ButtonGroup({ children }) {
  return <StyledBtns className="button-group">{children}</StyledBtns>;
}

Button.Group = ButtonGroup;
