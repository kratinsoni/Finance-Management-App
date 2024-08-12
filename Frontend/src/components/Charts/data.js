import { BASE_URL } from "../../constants.js";

const fetchlinedata = async () => {
  try {
    const response = await fetch(`${BASE_URL}/incomes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    console.log(data);

    const labels = data.map((item) => item.createdAt.slice(0, 10));
    const dataset = data.map((item) => item.amount)
   
    const lineData = [
        {
            labels: labels,
            datasets: [
            {
                label: "Income",
                data: dataset,
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
            ],
        },
        ];

    return lineData;
  } catch (error) {
    console.log(error);
  }
};

export { fetchlinedata };
