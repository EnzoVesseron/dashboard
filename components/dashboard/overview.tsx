"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addDays,
  addMonths,
  format,
  subDays,
  subMonths,
  startOfDay,
  eachDayOfInterval,
  eachMonthOfInterval,
  startOfMonth,
} from "date-fns";
import { fr } from "date-fns/locale";
import { useSite } from "@/lib/site-context";

type TimeRange = "week" | "month" | "year";

const generateDailyData = (startDate: Date, days: number, multiplier: number) => {
  return eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, days - 1)
  }).map(date => ({
    name: format(date, "dd MMM", { locale: fr }),
    fullDate: date,
    visiteurs: Math.floor(Math.random() * 300 * multiplier) + (100 * multiplier),
  }));
};

const generateMonthlyData = (startDate: Date, months: number, multiplier: number) => {
  return eachMonthOfInterval({
    start: startDate,
    end: addMonths(startDate, months - 1)
  }).map(date => ({
    name: format(date, "MMM yyyy", { locale: fr }),
    fullDate: date,
    visiteurs: Math.floor(Math.random() * 9000 * multiplier) + (3000 * multiplier),
  }));
};

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: "week", label: "7 derniers jours" },
  { value: "month", label: "30 derniers jours" },
  { value: "year", label: "12 derniers mois" },
];

// Multiplicateur de données par site
const siteMultipliers: Record<string, number> = {
  "1": 1,    // Site Principal
  "2": 0.6,  // Blog
  "3": 0.8,  // E-commerce
};

export function Overview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("week");
  const { currentSite } = useSite();
  
  const multiplier = siteMultipliers[currentSite.id] || 1;

  const data = useMemo(() => {
    const today = startOfDay(new Date());
    
    switch (selectedTimeRange) {
      case "week":
        return generateDailyData(subDays(today, 6), 7, multiplier);
      case "month":
        return generateDailyData(subDays(today, 29), 30, multiplier);
      case "year":
        const yearStart = startOfMonth(subMonths(today, 11));
        return generateMonthlyData(yearStart, 12, multiplier);
    }
  }, [selectedTimeRange, multiplier]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select
          value={selectedTimeRange}
          onValueChange={(value) => setSelectedTimeRange(value as TimeRange)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-sm"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-sm"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{
                color: "hsl(var(--foreground))",
                fontWeight: "500",
                marginBottom: "0.25rem",
              }}
              itemStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "0.875rem",
              }}
              labelFormatter={(label) => `${label}`}
            />
            <Bar
              dataKey="visiteurs"
              fill="hsl(var(--chart-1))"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}