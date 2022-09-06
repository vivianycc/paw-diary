import { useState, useEffect } from "react";
import styled from "styled-components";
import { Drawer, Select, Input } from "@geist-ui/core";
import dayjs from "dayjs";

const StyledDrawer = styled(Drawer)`
  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  input[type="date"],
  input[type="time"] {
    padding: 12px;
    border-radius: 24px;
    border: 1px solid var(--neutral-200);
  }
`;

export default function StatsMenu({
  showDrawer,
  setShowDrawer,
  setStats,
  stats,
}) {
  const [statsType, setStatsType] = useState("weight");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs().format("HH:mm"));

  useEffect(() => {
    setValue(0);
  }, [statsType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let existedDate = stats.find((obj) => obj.date === date);

    if (existedDate) {
      setStats((prevState) => {
        const newState = prevState.map((item) => {
          if (item.date === date) {
            return {
              ...item,
              [statsType]: +value,
            };
          }
          return item;
        });
        return newState;
      });
    } else {
      const newStats = [
        ...stats,
        {
          date: date,
          [statsType]: +value,
        },
      ];
      newStats.sort((a, b) => {
        return (
          dayjs(a.date, "YYYY-MM-DD").valueOf() -
          dayjs(b.date, "YYYY-MM-DD").valueOf()
        );
      });
      setStats(newStats);
    }
  };
  return (
    <StyledDrawer
      visible={showDrawer}
      onClose={() => setShowDrawer(false)}
      placement="bottom"
    >
      <form onSubmit={handleSubmit}>
        <Select
          placeholder="Choose one"
          onChange={(val) => setStatsType(val)}
          value={statsType}
        >
          <Select.Option value="weight">體重</Select.Option>
          <Select.Option value="breathRate">呼吸次數</Select.Option>
          <Select.Option value="heartRate">心率</Select.Option>
        </Select>
        <input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        {statsType !== "weight" && (
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        )}
        <div>
          <Input
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {statsType !== "weight" ? <span>次/每分鐘</span> : <span>公斤</span>}
        </div>
        <button type="submit">儲存</button>
      </form>
    </StyledDrawer>
  );
}
