"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "4 Nov", value: 40 },
  { name: "10 Nov", value: 30 },
  { name: "14 Nov", value: 50 },
  { name: "18 Nov", value: 45 },
  { name: "22 Nov", value: 60 },
  { name: "26 Nov", value: 80 },
  { name: "30 Nov", value: 95 },
];

import { useState, useEffect } from "react";

export function DealsChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[200px] w-full bg-zinc-50/50 animate-pulse rounded-xl" />;

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#4CAF50" 
            strokeWidth={3} 
            dot={{ r: 4, fill: "#4CAF50", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
