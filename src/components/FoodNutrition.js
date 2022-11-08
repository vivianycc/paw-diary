import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function FoodNutrition({
  brand,
  product,
  flavor,
  calories,
  foodType,
  ingredient,
  origin,
  weight,
  //%,
  water = 10,
  protein = 10,
  fat = 10,
  carbonhydrate = 10,
  ash = 10,
  fibre = 10,
  calcium = 10,
  phosphorus = 10,
  //IE,
  vitd3,
  //mg,
  taurine,
  zinc,
  manganese,
  iodine,
  vite,
  nonMeatElement,
}) {
  const data = [
    { name: "Water", value: water },
    { name: "Protein", value: protein },
    { name: "fat", value: fat },
    { name: "carbon", value: carbonhydrate },
    { name: "ash", value: ash },
    { name: "fibre", value: fibre },
    { name: "calcium", value: calcium },
    { name: "phosphorus", value: phosphorus },
  ];

  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "red",
    "orange",
    "blue",
    "green",
  ];
  const renderLabel = (datapoint) => {
    return `${datapoint.name} ${datapoint.value}%`;
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={300} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={renderLabel}
            minAngle={10}
            style={{ fontSize: 10 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div>材料：{ingredient}</div>

      <div>熱量：{calories}</div>
      <div>
        每公斤營養添加
        <p>vitd3:{vitd3}</p>
        <p>taurine:{taurine}</p>
        <p>zinc:{zinc}</p>
        <p>manganese:{manganese}</p>
        <p>iodine:{iodine}</p>
        <p>vite:{vite}</p>
      </div>
    </div>
  );
}
