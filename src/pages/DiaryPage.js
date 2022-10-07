import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import IconButton from "../components/IconButton";
import { Calendar } from "react-feather";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    h1 {
      letter-spacing: 2px;
    }
  }

  h2 {
    font-size: 14px;
    font-weight: 500;
  }
  .note {
    padding: 24px 16px;
    background-color: #fff;
    border-radius: 24px;
  }
`;
const StyledFoodIntakeItem = styled.div`
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

export default function DiaryPage(props) {
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedDayData, setSelectedDayData] = useState({});

  useEffect(() => {
    const filtered = props.entries.filter((entry) => {
      if (
        dayjs(entry.date).format("YYYY/MM/DD") ===
        selectedDay.format("YYYY/MM/DD")
      ) {
        return entry;
      }
    });
    if (filtered.length > 0) {
      setSelectedDayData(...filtered);
    }
  }, [props.entries, selectedDay]);

  const FoodIntakeItem = ({ info }) => {
    const { foodBrand, foodProduct, foodFlavor, time, portion, calories } =
      info;
    const calorieIntake = (calories * portion) / 100;
    return (
      <StyledFoodIntakeItem>
        <span className="time">{time}</span>
        <span className="item-name-portion">
          <h3 className="item-name">{foodFlavor}</h3>
          <p>{calorieIntake} kcal</p>
        </span>
        <p className="item-desc">{`${foodBrand} ${foodProduct} ${portion}g`}</p>
      </StyledFoodIntakeItem>
    );
  };
  const { note, foodIntake = [] } = selectedDayData;
  return (
    <StyledPage>
      <div className="header">
        <h1>{`${selectedDay.locale("zh-tw").format("MMMD")}日`}</h1>
        <IconButton
          icon={<Calendar />}
          color="var(--neutral-200)"
          strokeColor="var(--neutral-700)"
        />
      </div>
      <div className="note">
        {console.log(selectedDayData)}
        {Object.keys(selectedDayData).length === 0 ? "今天還沒有紀錄" : note}
      </div>
      <h2>食物紀錄</h2>
      {foodIntake.map((info) => (
        <FoodIntakeItem info={info} />
      ))}
    </StyledPage>
  );
}
