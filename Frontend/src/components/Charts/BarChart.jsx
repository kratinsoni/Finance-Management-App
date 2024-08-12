import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BASE_URL } from "../../constants.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({
  value = "expenses",
  backgroundColor = "rgb(75, 192, 192)",
  borderColor = "rgba(75, 192, 192, 0.2)",
  title = "Income",
}) {
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

  const [bardata, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  

  const fetchBarData = async () => {
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
            borderWidth: 2,
            borderRadius: 10,
          },
        ],
      };
      setBarData(lineData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBarData();
  }, []);

  return <Bar options={options} data={bardata} />;
}

export default BarChart;
