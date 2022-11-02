import { useState, useEffect } from "react";
import styled from "styled-components";
import { Drawer, Select, Input } from "@geist-ui/core";
import dayjs from "dayjs";
import { getFirebase } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

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

export default function StatsMenu({ showDrawer, setShowDrawer, currentPet }) {
  const [statsType, setStatsType] = useState("weight");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs().format("HH:mm"));
  const { firestore } = getFirebase();
  const { user } = useAuth();

  useEffect(() => {
    setValue(0);
  }, [statsType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: date,
      [statsType]: +value,
    };

    const docRef = doc(
      firestore,
      "users",
      user.uid,
      "pets",
      currentPet,
      "stats",
      date
    );
    setDoc(docRef, data, { merge: true });
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
