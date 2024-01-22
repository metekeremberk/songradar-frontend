"use client";

import { CategoryScale, Chart } from "chart.js/auto";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function StarredSongsDecadesPieChart({ data }) {
  let decades = {};

  data.forEach((item) => {
    // Determine the decade
    let decade = Math.floor(item.year / 10) * 10;

    // Check if the array for this decade exists, if not create it
    if (!decades[decade]) {
      decades[decade] = [];
    }

    // Add the item to the respective decade array
    decades[decade].push(item);
  });

  const [chartData, setChartData] = useState({
    labels: Object.keys(decades),
    datasets: [
      {
        label: "Number of starred songs in this decade",
        data: Object.values(decades).map((decade) => decade.length),
        backgroundColor: [
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#12hu45",
          "#123456",
          "#ko896a",
          "#011223",
        ],
      },
    ],
  });

  console.log(chartData);

  return (
    <div className="basis-1/2 rounded-xl bg-gray-50 p-2">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Decades of your starred songs",
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
