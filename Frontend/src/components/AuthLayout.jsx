import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setLoader(false);
      console.log(data);
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return loader ? <h1>Loading....</h1> : <>{children}</>;
}
