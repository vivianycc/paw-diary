import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function StatsLineChart({ data, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          interval="preserveStart"
          tick={{ fontSize: 10 }}
          dataKey="date"
          tickFormatter={(dateStr) =>
            dayjs(dateStr, "YYYY-MM-DD").format("MM/DD")
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
}
