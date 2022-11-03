import React from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  label + input {
    width: 100%;
  }
  input {
    padding: 10px 12px;
    outline: none;
    border: 1px solid var(--neutral-300);
    border-radius: 8px;
  }
  label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  className,
}) {
  return (
    <StyledInput className={`${className} input`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </StyledInput>
  );
}
