"use client";

import { CategoryScale, Chart } from "chart.js/auto";
import { useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function StarredSongsLoudnessLineChart({ data }) {
  const [chartData, setChartData] = useState({
    labels: data.map((song) =>
      song.name.length > 10
        ? song.name.substring(0, 10 - 3) + "..."
        : song.name,
    ),
    datasets: [
      {
        label: "Loudness of starred songs (dB)",
        data: data.map((song) => song.loudness),
      },
    ],
  });

  return (
    <div className="basis-1/2 rounded-xl bg-gray-50 p-2">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Loudness of your starred songs",
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
