import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import IconButton from "./IconButton";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useEffect } from "react";

const StyledCalendar = styled.div`
  padding: 24px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  .day-label {
    margin-bottom: 4px;
    font-size: 12px;
  }
`;
const DayButton = styled.button`
  aspect-ratio: 1;
  border-radius: 100%;
  border: none;
  color: ${(props) =>
    props.currentMonth ? "var(--neutral-700)" : "var(--neutral-300)"};
  outline: none;
  background-color: ${(props) =>
    props.isToday ? "var(-neutral-200)" : "transparent"};
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const getMonth = (month = dayjs().month()) => {
  let firstDayOfMonth = dayjs().month(month).startOf("month").day();
  let totalWeeks = firstDayOfMonth > 4 ? 6 : 5;
  //if first day of the week starts after friday add 1 row of week just in case
  const grid = Array(totalWeeks).fill(Array(7).fill(0));
  let dayIndex = 0 - firstDayOfMonth;
  let monthArr = grid.map((week) => {
    return week.map((day) => {
      dayIndex++;
      return dayjs().month(month).date(dayIndex);
    });
  });

  return monthArr;
};

export default function Calendar({
  month = dayjs().month(),
  setSelectedDay,
  setShowModal,
}) {
  const [monthGrid, setMonthGrid] = useState(getMonth(month));
  const [monthIndex, setMonthIndex] = useState(month);

  const goToPrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const goToNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  useEffect(() => {
    setMonthGrid(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <StyledCalendar>
      <header>
        <IconButton
          icon={<ChevronLeft />}
          size="40"
          color="var(--neutral-100)"
          strokeColor="var(--neutral-400)"
          onClick={goToPrevMonth}
        />
        <p>{dayjs().month(monthIndex).locale("zh-tw").format("MMM")}</p>
        <IconButton
          icon={<ChevronRight />}
          size="40"
          color="var(--neutral-100)"
          strokeColor="var(--neutral-400)"
          onClick={goToNextMonth}
        />
      </header>
      <Grid>
        {monthGrid[0].map((day) => (
          <div className="day-label">{day.format("ddd").toUpperCase()}</div>
        ))}
        {monthGrid.map((week) => (
          <React.Fragment>
            {week.map((day) => (
              <DayButton
                key={day}
                currentMonth={
                  day.format("M") === dayjs().month(monthIndex).format("M")
                }
                isToday={dayjs().isSame(day, "day")}
                onClick={() => {
                  setSelectedDay(day);
                  setShowModal(false);
                }}
              >
                {day.format("D")}
              </DayButton>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </StyledCalendar>
  );
}
