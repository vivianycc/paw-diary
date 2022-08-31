import React, { useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: var(--neutral-200);
  border-radius: 16px;

  .controls {
    display: inline-flex;
    width: 100%;
    height: 100%;
  }

  .segment {
    flex: 1;
    padding: 2px;
    position: relative;
    text-align: center;
  }
  .segment input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  .segment label {
    display: block;
    padding: 6px 10px;
    border-radius: 16px;
    cursor: pointer;
    color: var(--neutral-400);
  }
  .segment.active label {
    color: var(--neutral-600);
    background-color: var(--neutral-50);
  }
`;

export default function SegmentedControl({
  name,
  segments,
  callback,
  defaultIndex = 0,
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const onInputChange = (value, index) => {
    setActiveIndex(index);
    callback(value, index);
  };

  return (
    <StyledWrapper className="controls-container">
      <div className="controls">
        {segments.map((segment, index) => {
          return (
            <div
              className={`segment ${
                index === activeIndex ? "active" : "inactive"
              }`}
              key={segment.value}
            >
              <input
                name={name}
                type="radio"
                id={segment.label}
                value={segment.value}
                checked={index === activeIndex}
                onChange={() => onInputChange(segment.value, index)}
              />
              <label htmlFor={segment.label}>{segment.label}</label>
            </div>
          );
        })}
      </div>
    </StyledWrapper>
  );
}
