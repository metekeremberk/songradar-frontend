"use client";

import { CategoryScale, Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function AlbumDetailsBarChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: Object.keys(data).map(
      (str) => str.charAt(0).toUpperCase() + str.slice(1),
    ),
    datasets: [
      {
        label: "Values of the song",
        data: Object.values(data),
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: Object.keys(data).map(
        (str) => str.charAt(0).toUpperCase() + str.slice(1),
      ),
      datasets: [
        {
          label: "Values of the song",
          data: Object.values(data),
        },
      ],
    });
  }, [data]);

  return (
    <div className="h-full basis-1/2 rounded-xl bg-gray-50 p-2">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Detailed information",
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
