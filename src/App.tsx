import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const fields: {
  name: "firstName" | "lastName" | "email" | "dob";
  label: string;
  type: string | undefined;
}[] = [
  {
    name: "firstName",
    label: "First Name",
    type: undefined,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: undefined,
  },
  {
    name: "email",
    label: "Email",
    type: undefined,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
  },
];

const defaultUserData = {
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
};

function App() {
  const [userData, setUserData] = useState(defaultUserData);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
        <div className="flex flex-row items-center justify-between gap-5">
          <img src={logo} className="h-16 w-16" />
          <span className="text-xl text-center">
            Welcome to Lession 5 of $react-typescript with #tailwind
          </span>
        </div>
        {fields.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="w-full flex flex-col items-start gap-1"
          >
            <label>{field.label}</label>

            <input
              type={field.type}
              value={userData[field.name]}
              onChange={(e) =>
                setUserData((userData) => {
                  return { ...userData, [field.name]: e.target.value };
                })
              }
              className="px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
            />
          </div>
        ))}
        <div className="flex flex-row items-center gap-5">
          <button className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg">
            Submit
          </button>
          <button
            onClick={() => setUserData(defaultUserData)}
            className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Clear data
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
