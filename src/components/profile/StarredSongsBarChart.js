"use client";

import { CategoryScale, Chart } from "chart.js/auto";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function StarredSongsBarChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: Object.keys(data).map(
      (str) => str.charAt(0).toUpperCase() + str.slice(1),
    ),
    datasets: [
      {
        label: "Average values of starred songs",
        data: Object.values(data),
      },
    ],
  });

  return (
    <div className="basis-1/2 rounded-xl bg-gray-50 p-2">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Average values of your starred songs",
            },
            legend: {
              display: false,
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
