"use client";

import { CategoryScale, Chart } from "chart.js/auto";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function StarredSongsKeysPieChart({ data }) {
  const pitchClasses = {
    "-1": "No Key Detected",
    0: "C",
    1: "C♯/D♭",
    2: "D",
    3: "D♯/E♭",
    4: "E",
    5: "F",
    6: "F♯/G♭",
    7: "G",
    8: "G♯/A♭",
    9: "A",
    10: "A♯/B♭",
    11: "B",
  };

  let tracksByKeys = {};

  data.forEach((track) => {
    // Get the key description from pitchClasses, or 'No Key Detected' if not found
    let keyName = pitchClasses[track.key.toString()] || "No Key Detected";

    // Check if the array for this key exists, if not create it
    if (!tracksByKeys[keyName]) {
      tracksByKeys[keyName] = [];
    }

    // Add the track to the respective key array
    tracksByKeys[keyName].push(track);
  });

  const [chartData, setChartData] = useState({
    labels: Object.keys(tracksByKeys),
    datasets: [
      {
        label: "Number of starred songs with this key",
        data: Object.values(tracksByKeys).map((decade) => decade.length),
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
              text: "Keys of your starred songs",
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
