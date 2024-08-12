import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../constants.js";
import ExpenseCard from "../Cards/ExpenseCard.jsx";

function AllExpenses() {
  const [expenseData, setExpenseData] = useState("");

  const getExpenses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/expenses/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setExpenseData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pt-6 place-items-center">
      {expenseData &&
        expenseData.map((expense) => (
          <ExpenseCard
            key={expense._id}
            id={expense._id}
            title={expense.title}
            amount={expense.amount}
            description={expense.description}
            category={expense.category}
          />
        ))}
      
    </div>
  );
}

export default AllExpenses;
