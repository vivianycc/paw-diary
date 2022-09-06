import React from "react";
import styled from "styled-components";

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 8px 0;
  padding: 12px;
  border-radius: 24px;
  background-color: white;
  color: var(--neutral-700);
  font-size: 16px;
`;

const units = {
  weight: "公斤",
  heartRate: "次/分鐘",
  breathRate: "次/分鐘",
};
export default function StatsItem({ data, type }) {
  return (
    <StyledItem>
      <p className="time">{data.date}</p>
      <p className="data">{`${data[type]} ${units[type]}`}</p>
    </StyledItem>
  );
}
