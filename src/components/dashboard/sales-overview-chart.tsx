"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", Profit: 4000, Expenses: 2400 },
  { name: "Feb", Profit: 3000, Expenses: 1398 },
  { name: "Mar", Profit: 2000, Expenses: 9800 },
  { name: "Apr", Profit: 2780, Expenses: 3908 },
  { name: "May", Profit: 1890, Expenses: 4800 },
  { name: "Jun", Profit: 2390, Expenses: 3800 },
  { name: "Jul", Profit: 3490, Expenses: 4300 },
  { name: "Aug", Profit: 4000, Expenses: 2400 },
  { name: "Sep", Profit: 3000, Expenses: 1398 },
  { name: "Oct", Profit: 2000, Expenses: 9800 },
  { name: "Nov", Profit: 2780, Expenses: 3908 },
  { name: "Dec", Profit: 3490, Expenses: 4300 },
];

import { useState, useEffect } from "react";

export function SalesOverviewChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full bg-zinc-50/50 animate-pulse rounded-xl" />;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#00003C", border: "none", borderRadius: "8px", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Bar dataKey="Profit" fill="#4B49AC" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#98BDFF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
