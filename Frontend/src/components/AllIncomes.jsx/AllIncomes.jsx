import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../constants.js";
import IncomeCard from "../Cards/IncomeCard.jsx";

function AllIncomes() {
  const [incomeData, setIncomeData] = useState("");

  const getIncomes = async () => {
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
      setIncomeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pt-6 place-items-center">
      {incomeData ? (
        incomeData.map((income) => (
          <IncomeCard
            key={income._id}
            id={income._id}
            amount={income.amount}
            description={income.description}
            category={income.category}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AllIncomes;
