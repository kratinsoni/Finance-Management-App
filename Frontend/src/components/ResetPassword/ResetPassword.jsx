import React, { useState } from "react";
import { BASE_URL } from "../../constants.js";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          username,
          password,
          newPassword,
        }),
      });

      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div class="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div class="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div class="flex flex-col">
              <div>
                <h2 class="text-4xl text-black">Reset password</h2>
              </div>
            </div>
            <div>
              <div class="mt-4 space-y-6">
                <div class="col-span-full">
                  <label class="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    username{" "}
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    placeholder="username"
                    class="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div class="col-span-full">
                  <label class="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="******"
                    class="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div class="col-span-full">
                  <label class="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    New Password{" "}
                  </label>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    placeholder="******"
                    class="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-full">
                  <button
                    onClick={handleReset}
                    class="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    {" "}
                    Change Password{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
