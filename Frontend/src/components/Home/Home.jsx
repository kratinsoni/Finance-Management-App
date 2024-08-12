import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants.js";
import CardOne from "../Cards/CardOne.jsx";
import LineChart from "../Charts/LineChart.jsx";
import BarChart from "../Charts/BarChart.jsx";

function Home() {
  const [user, setUser] = useState("");
  const [totalIncomeAndExpense, setTotalIncomeAndExpense] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncomeAndExpenses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/totalincomeexpense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setTotalIncomeAndExpense(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getIncomeAndExpenses();
  }, []);

  return (
    <div className="bg-slate-100">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 pt-6 place-items-center">
        <CardOne
          Name="TOTAL INCOME"
          Value={totalIncomeAndExpense.totalIncome}
          type="Incomes"
          url="/incomes"
        />
        <CardOne
          Name="TOTAL EXPENSE"
          Value={totalIncomeAndExpense.totalExpense}
          type="Expenses"
          url="/expenses"
        />
        <CardOne
          Name="SAVINGS"
          Value={
            totalIncomeAndExpense.totalIncome -
            totalIncomeAndExpense.totalExpense
          }
        />
        <CardOne Name="BUDGET" Value="20000" />
      </div>
      <div className="md:flex-row flex px-8 flex-col items-center py-8 justify-center">
        <div className="2xl:w-[800px] lg:w-[600px] w-[400px]">
          <LineChart
            value="incomes"
            backgroundColor="#064FF0"
            borderColor="#064FF0"
          />
        </div>
        <div className="2xl:w-[800px] lg:w-[600px] w-[400px]">
          <BarChart
            value="incomes"
            title="Income"
            backgroundColor="#064FF0"
            borderColor="#064FF0"
          />
        </div>
      </div>
      <div className="md:flex-row flex px-8 flex-col items-center py-8 justify-center">
        <div className="2xl:w-[800px] lg:w-[600px] w-[400px]">
          <LineChart
            value="expenses"
            backgroundColor="#FF3030"
            borderColor="#FF3030"
            title="Expenses"
          />
        </div>
        <div className="2xl:w-[800px] lg:w-[600px] w-[400px]">
          <BarChart
            value="expenses"
            title="Expenses"
            backgroundColor="#FF3030"
            borderColor="#FF3030"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
