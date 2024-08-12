import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

function ExpenseCard({
  id = null,
  title = "none",
  amount = "000",
  category = "work",
  description = "branch of science that examines the compounds made of atoms, molecules,",
}) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      alert("Expense deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    navigate(`/editexpense/${id}`);
  };

  return (
    <div class="bg-white w-80 p-5 min-h-40 shadow-md relative rounded-md overflow-hidden">
      <button class="bg-green-200 text-green-700 rounded-xl px-3 py-1 absolute right-2 text-sm">
        {category}
      </button>
      <div class="py-3 px-1">
        <p class="text-2xl font-bold font-sans">${amount}</p>
      </div>
      <p class="text-lg font-bold font-sans">{title}</p>
      <div class="text-sm py-2 h-10 font-mono overflow-auto">{description}</div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDelete}
          class="group relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
        >
          <svg
            viewBox="0 0 1.625 1.625"
            class="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
            height="15"
            width="15"
          >
            <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
            <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
            <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
          </svg>
          <svg
            width="16"
            fill="none"
            viewBox="0 0 39 7"
            class="origin-right duration-500 group-hover:rotate-90"
          >
            <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
            <line
              stroke-width="3"
              stroke="white"
              y2="1.5"
              x2="26.0357"
              y1="1.5"
              x1="12"
            ></line>
          </svg>
          <svg width="16" fill="none" viewBox="0 0 33 39" class="">
            <mask fill="white" id="path-1-inside-1_8_19">
              <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
            </mask>
            <path
              mask="url(#path-1-inside-1_8_19)"
              fill="white"
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
            ></path>
            <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
            <path stroke-width="4" stroke="white" d="M21 6V29"></path>
          </svg>
        </button>
        <button
          onClick={handleEdit}
          title="Add New"
          class="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45px"
            height="50px"
            viewBox="0 0 24 24"
            class="stroke-blue-400 fill-none group-hover:fill-blue-800 group-active:stroke-blue-200 group-active:fill-blue-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke-width="1.5"
            ></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
