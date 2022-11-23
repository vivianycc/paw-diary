import React, { forwardRef } from "react";
import styled, { useTheme, css } from "styled-components";

const variantStyles = (theme, variant = "primary") => {
  return {
    primary: css`
      color: var(--neutral-700);
      border: 1px solid var(--neutral-200);
    `,
    warning: css`
      border: 1px solid ${theme.colors.warning};
    `,
  }[variant];
};

const StyledInput = styled.div`
  label + input {
    width: 100%;
  }
  input {
    padding: 10px 12px;
    outline: none;
    border: 1px solid var(--neutral-300);
    border-radius: 8px;

    ${({ theme, variant }) => variantStyles(theme, variant)}
  }
  label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 14px;
  }
  p.error-message {
    min-height: 16px;
    margin-top: 2px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.warning};
    text-align: left;
    line-height: 16px;
  }
`;

const Input = (
  {
    label,
    name,
    type = "text",
    value,
    onChange,
    className,
    variant,
    error,
    ...props
  },
  ref
) => {
  const theme = useTheme();
  // console.log(register);
  return (
    <StyledInput
      className={`${className} input`}
      theme={theme}
      variant={variant}
    >
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        {...props}
        ref={ref}
      />
      <p className="error-message">{error?.message}</p>
    </StyledInput>
  );
};

export default forwardRef(Input);
