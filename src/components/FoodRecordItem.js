import React from "react";
import styled from "styled-components";

const StyledFoodRecordItem = styled.div`
  padding: 16px;
  border-radius: 24px;
  background-color: #fff;

  .time {
    font-size: 12px;
    color: var(--neutral-500);
  }

  .item-desc {
    font-size: 14px;
    color: var(--neutral-500);
  }
  .item-name-portion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 6px 0;
    font-size: 16px;
    color: var(--neutral-700);

    h3 {
      font-weight: 400;
      font-size: 16px;
    }
  }
`;

export default function FoodRecordItem({ info }) {
  const { foodBrand, foodProduct, foodFlavor, time, portion, calories } = info;
  const calorieIntake = (calories * portion) / 100;
  return (
    <StyledFoodRecordItem>
      <span className="time">{time}</span>
      <span className="item-name-portion">
        <h3 className="item-name">{foodFlavor}</h3>
        <p>{calorieIntake} kcal</p>
      </span>
      <p className="item-desc">{`${foodBrand} ${foodProduct} ${portion}g`}</p>
    </StyledFoodRecordItem>
  );
}
