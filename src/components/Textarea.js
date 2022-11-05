import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  label {
    display: inline-block;
    font-size: 14px;
    color: var(--neutral-700);
    margin-bottom: 8px;
  }
  textarea {
    width: 100%;
    padding: 16px;
    border-radius: 16px;
  }
`;

export default function Textarea({
  placeholder,
  className,
  label,
  name,
  value,
  required,
  onChange,
}) {
  return (
    <StyledDiv>
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        cols="30"
        rows="10"
        placeholder={placeholder}
        className={`${className} textarea`}
        required={required}
        onChange={onChange}
        value={value}
      />
    </StyledDiv>
  );
}
