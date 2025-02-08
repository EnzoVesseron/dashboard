"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Laptop, Smartphone, Tablet } from "lucide-react";

interface DeviceData {
  name: string;
  value: number;
  color: string;
  icon: JSX.Element;
}

export function DeviceStats() {
  const data: DeviceData[] = [
    {
      name: "Desktop",
      value: 45,
      color: "hsl(var(--chart-1))",
      icon: <Laptop className="h-4 w-4" />,
    },
    {
      name: "Mobile",
      value: 40,
      color: "hsl(var(--chart-2))",
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      name: "Tablet",
      value: 15,
      color: "hsl(var(--chart-3))",
      icon: <Tablet className="h-4 w-4" />,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border">
          <div className="flex items-center gap-2">
            {data.icon}
            <span className="font-medium">{data.name}</span>
          </div>
          <p className="text-muted-foreground">
            {data.value}% des visites
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6" style={{ height: 400 }}>
      <div className="w-[300px] h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className="stroke-background hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-8">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div className="flex items-center gap-1.5">
              {entry.icon}
              <span className="text-sm font-medium">{entry.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}