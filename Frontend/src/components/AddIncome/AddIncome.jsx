import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../constants.js";
import { useNavigate } from "react-router-dom";

function AddIncome({ id = null }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let response;
      if (!id) {
        response = await fetch(`${BASE_URL}/incomes/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            amount,
            category,
            description,
          }),
        });
      } else {
        response = await fetch(`${BASE_URL}/incomes/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            amount,
            category,
            description,
          }),
        });
      }

      const data = await response.json();
      console.log(data);
      alert("Income added/edited successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen flex justify-center ">
      <div className="w-3/4 rounded-md shadow-lg min-h-48 bg-white my-12 py-4 px-8 flex flex-col gap-6">
        <h1 className="font-extrabold text-3xl">
          {id ? "EDIT INCOME" : "ADD INCOME"}
        </h1>

        <div class="relative">
          <input
            type="text"
            class="peer py-3 px-4 ps-11 block w-full bg-gray-200 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 11a3 3 0 0 0-3 3H7a3 3 0 0 0-3-3V9a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v6z"></path>
              <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
            </svg>
          </div>
        </div>
        <div class="relative">
          <input
            type="text"
            class="peer py-3 px-4 ps-11 block w-full bg-gray-200 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
            </svg>
          </div>
        </div>
        <div class="relative">
          <textarea
            class="peer py-3 px-4 h-48 ps-11 block w-full bg-gray-200 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          class="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
          >
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              id="SVGRepo_tracerCarrier"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Interface / Download">
                {" "}
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="#f1f1f1"
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                  id="Vector"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          {id ? "EDIT INCOME" : "ADD INCOME"}
          <div class="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
            {id ? "EDIT INCOME" : "ADD INCOME"}
          </div>
        </button>
      </div>
    </div>
  );
}

export default AddIncome;
