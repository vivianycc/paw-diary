import React from "react";
import styled from "styled-components";
import { Rating } from "@geist-ui/core";

const StyledFoodItem = styled.div`
  margin-bottom: 8px;
  padding: 24px;
  border-radius: 24px;
  background-color: white;
  position: relative;

  .brand {
    font-size: 14px;
    color: var(--neutral-500);
  }
  .flavor {
    margin: 8px 0;
  }
  .rating .icon-box {
    --rating-font-size: 10px;
    pointer-events: none;
  }
  .tag {
    padding: 4px 6px;
    border-radius: 8px;
    position: absolute;
    top: 24px;
    right: 24px;
    background-color: var(--neutral-300);
    color: white;
    font-size: 14px;
  }
`;

const foodTypeList = {
  complete: "主食",
  treat: "零食",
  complementary: "副食",
  supplement: "保健品",
};

export default function FoodItem({ food, rating, comment, onClick }) {
  return (
    <StyledFoodItem onClick={onClick}>
      <p className="brand">{food.brand}</p>
      <p className="flavor">{food.flavor}</p>
      <Rating value={rating} />
      <span className="tag">{foodTypeList[food.foodType] || "主食"}</span>
    </StyledFoodItem>
  );
}
