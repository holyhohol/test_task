import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { datesInterval } from "./DatesInterval";

function DateChart({ chartData, startDate, endDate }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Likes statistic",
      },
      interaction: {
        intersect: false,
      },
      
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks:{
                stepSize: 1,
            },
            min: 0,
        }

    },
    interaction: {
        intersect: false,
      },
  };

  const start = new Date(startDate);
  const end = new Date(endDate);

  const data = {
    labels: datesInterval(start, end),
    datasets: [
      {
        type: "line",
        label: "Likes",
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        parsing: {
          xAxisKey: "created_at",
          yAxisKey: "total",
        },
        tension: 0.2,
        spanGaps: false

      },
    ],
  };

  return <Line options={options} data={data} />;
}
export default DateChart;
