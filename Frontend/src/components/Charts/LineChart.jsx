import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import { BASE_URL } from "../../constants.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({
  value = "expenses",
  backgroundColor = "rgb(75, 192, 192)",
  borderColor = "rgba(75, 192, 192, 0.2)",
  title = "Income",
}) {
  const [linedata, setLineData] = useState({
    labels: [],
    datasets: [],
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${title} over time`,
        color: "black",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  };

  const fetchLineData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${value}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      console.log(data);

      const labels = data.map((item) => item.createdAt.slice(0, 10));
      const dataset = data.map((item) => item.amount);

      const lineData = {
        labels: labels,
        datasets: [
          {
            label: "Income",
            data: dataset,
            fill: false,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          },
        ],
      };
      setLineData(lineData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLineData();
  }, []);

  return <Line options={options} data={linedata} />;
}

export default LineChart;
