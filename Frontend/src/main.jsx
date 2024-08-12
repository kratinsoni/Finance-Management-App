import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import AddExpense from "./components/AddExpense/AddExpense.jsx";
import AddIncome from "./components/AddIncome/AddIncome.jsx";
import AllExpenses from "./components/AllExpenses/AllExpenses.jsx";
import AllIncomes from "./components/AllIncomes.jsx/AllIncomes.jsx";
import EditIncome from "./components/AddIncome/editIncome.jsx";
import EditExpense from "./components/AddExpense/editExpense.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <App />
      </AuthLayout>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthLayout>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/addexpense",
        element: (
          <AuthLayout>
            <AddExpense />
          </AuthLayout>
        ),
      },
      {
        path: "/addincome",
        element: (
          <AuthLayout>
            <AddIncome />
          </AuthLayout>
        ),
      },
      {
        path: "/resetpassword",
        element: (
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        ),
      },
      {
        path: "/expenses",
        element: (
          <AuthLayout>
            <AllExpenses />
          </AuthLayout>
        ),
      },
      {
        path: "/incomes",
        element: (
          <AuthLayout>
            <AllIncomes />
          </AuthLayout>
        ),
      },
      {
        path: "/editincome/:id",
        element: (
          <AuthLayout>
            <EditIncome />
          </AuthLayout>
        ),
      },
      {
        path: "/editexpense/:id",
        element: (
          <AuthLayout>
            <EditExpense/>
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
