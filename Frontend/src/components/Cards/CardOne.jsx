import React from "react";
import { useNavigate } from "react-router-dom";

function CardOne({ Name, Value, type, url = "/#" }) {
  const navigate = useNavigate();

  return (
    <div class="w-72 bg-white rounded-b-lg border-t-8 border-green-400 px-4 py-5 flex flex-col justify-around shadow-md">
      <p class="text-lg font-bold font-sans">{Name}</p>
      <div class="py-3">
        <h1 className="font-extrabold text-3xl">${Value}</h1>
      </div>
      <div class="flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "rgba(0, 0, 0, 1)" }}
        >
          <path d="M16 12h2v4h-2z"></path>
          <path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM5 5h13v2H5a1.001 1.001 0 0 1 0-2zm15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15v10z"></path>
        </svg>
        <div class="text-sm flex gap-2">
          <button
            onClick={() => navigate(url)}
            class="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out"
          >
            {type && `See All ${type}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardOne;
