import React, { useState } from "react";
import styled from "styled-components";
import { Tabs } from "@geist-ui/core";
import SegmentedControl from "../components/SegmentedControl";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    time: "2022/05/15",
    weight: 4.1,
    heartRate: 120,
    breathRate: 45,
  },
  {
    time: "2022/05/18",
    weight: 4.15,
    heartRate: 123,
    breathRate: 43,
  },
  {
    time: "2022/05/20",
    weight: 4.18,
    heartRate: 133,
    breathRate: 30,
  },

  {
    time: "2022/06/15",
    weight: 4.32,
    heartRate: 128,
    breathRate: 47,
  },
  {
    time: "2022/06/16",
    weight: 4.48,
    heartRate: 129,
    breathRate: 35,
  },
  {
    time: "2022/06/17",
    weight: 4.39,
    heartRate: 134,
    breathRate: 39,
  },
  {
    time: "2022/06/27",
    weight: 4.2,
    heartRate: 132,
    breathRate: 35,
  },
  {
    time: "2022/06/28",
    weight: 4.2,
    heartRate: 132,
    breathRate: 35,
  },
  {
    time: "2022/06/29",
    weight: 4.2,
    heartRate: 132,
    breathRate: 35,
  },
  {
    time: "2022/07/15",
    weight: 4.1,
    heartRate: 120,
    breathRate: 45,
  },
  {
    time: "2022/07/18",
    weight: 4.15,
    heartRate: 123,
    breathRate: 43,
  },
  {
    time: "2022/07/20",
    weight: 4.18,
    heartRate: 133,
    breathRate: 30,
  },

  {
    time: "2022/08/15",
    weight: 4.32,
    heartRate: 128,
    breathRate: 47,
  },
  {
    time: "2022/08/16",
    weight: 4.48,
    heartRate: 129,
    breathRate: 35,
  },
  {
    time: "2022/08/17",
    weight: 4.39,
    heartRate: 134,
    breathRate: 39,
  },
  {
    time: "2022/08/27",
    weight: 4.2,
    heartRate: 132,
    breathRate: 35,
  },
  {
    time: "2022/08/28",
    weight: 4.2,
    heartRate: 132,
    breathRate: 35,
  },
  {
    time: "2022/08/29",
    weight: 4.2,
    heartRate: 132,
    breathRate: 35,
  },
];

function getDaysAgo(days) {
  dayjs.extend(isBetween);
  const today = dayjs();
  const daysAgo = today.subtract(days, "day");
  const arr = data.filter((data) =>
    dayjs(data.time).isBetween(daysAgo, today, [])
  );
  return arr;
}
function CustomLabel({ x, y, stroke, value, width }) {
  if (value) {
    // No label if there is a value. Let the cell handle it.
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      // Move slightly above axis
      dy={-10}
      // Center text
      dx={width / 2}
      fill={stroke}
      fontSize={20}
      textAnchor="middle"
    >
      N/A
    </text>
  );
}

const StyledStatsPage = styled.div`
  padding-top: 32px;
`;
const RenderLineChart = ({ data, dataKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke="#8884d8"
        label={<CustomLabel />}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        interval="preserveStart"
        tick={{ fontSize: 10 }}
        dataKey="time"
        tickFormatter={(timeStr) =>
          dayjs(timeStr, "YYYY/MM/DD").format("MM/DD")
        }
      />

      <YAxis
        tick={{ fontSize: 10 }}
        width={30}
        orientation="right"
        domain={[(dataMin) => dataMin * 0.8, (dataMax) => dataMax * 1.2]}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default function StatsPage() {
  const [stats, setStats] = useState([{}]);

  const segmentCallback = (value) => {
    setStats(getDaysAgo(value));
  };

  return (
    <StyledStatsPage>
      <Tabs initialValue="1" hideDivider>
        <Tabs.Item label="體重" value="1">
          <SegmentedControl
            segments={[
              { label: "週", value: 7 },
              { label: "月", value: 30 },
              { label: "3 個月", value: 90 },
            ]}
            name="timeScale"
            callback={segmentCallback}
            defaultIndex={0}
          />
          <RenderLineChart data={stats} dataKey="weight" />
        </Tabs.Item>
        <Tabs.Item label="呼吸次數" value="2">
          <SegmentedControl
            segments={[
              { label: "週", value: 7 },
              { label: "月", value: 30 },
              { label: "3 個月", value: 90 },
            ]}
            name="timeScale"
            callback={segmentCallback}
            defaultIndex={0}
          />
          <RenderLineChart data={stats} dataKey="breathRate" />
        </Tabs.Item>
        <Tabs.Item label="心率" value="3">
          <SegmentedControl
            segments={[
              { label: "週", value: 7 },
              { label: "月", value: 30 },
              { label: "2 個月", value: 60 },
              { label: "3 個月", value: 90 },
            ]}
            name="timeScale"
            callback={segmentCallback}
            defaultIndex={0}
          />
          <RenderLineChart data={stats} dataKey="heartRate" />
        </Tabs.Item>
      </Tabs>
    </StyledStatsPage>
  );
}
