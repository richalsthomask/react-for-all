import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface fieldData {
  id: number;
  label: string;
  value: string;
}

const defaultFields = ["firstName", "lastName", "email"];

const uniqueId = (data: fieldData[]) => {
  let id = Math.random() * 100;
  while (data?.find((ele) => ele.id === id)) {
    id = Math.random() * 100;
  }
  return id;
};

function App() {
  const [userData, setUserData] = useState<fieldData[]>(() => {
    let data: fieldData[] = [];

    for (let i = 0; i < defaultFields.length; i++) {
      data = [
        ...data,
        { id: uniqueId(data), label: defaultFields[i], value: "" },
      ];
    }
    return data;
  });
  const [fieldName, setFieldName] = useState("");

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
        <div className="flex flex-row items-center justify-between gap-5">
          <img src={logo} className="h-16 w-16" />
          <span className="text-xl text-center">
            Welcome to Lession 5 of $react-typescript with #tailwind
          </span>
        </div>
        {userData?.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="w-full flex flex-col items-start gap-1"
          >
            <label>{field.label}</label>

            <div className="w-full flex flex-row gap-3">
              <input
                value={field.value}
                onChange={(e) =>
                  setUserData((userData) =>
                    userData.map((val) =>
                      val.id === field.id
                        ? { ...val, value: e.target.value }
                        : val
                    )
                  )
                }
                className="px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
              />
              <button
                onClick={() => {
                  setUserData((userData) =>
                    userData.filter((val) => val.id !== field.id)
                  );
                }}
                className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="w-full flex flex-col items-start gap-1">
          <label>Add new field</label>

          <div className="w-full flex flex-row items-center gap-2">
            <input
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
            />
            <button
              onClick={() => {
                if (fieldName.length > 0) {
                  setUserData((userData) => {
                    return [
                      ...userData,
                      { id: uniqueId(userData), label: fieldName, value: "" },
                    ];
                  });

                  setFieldName("");
                }
              }}
              className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <button className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg">
            Submit
          </button>
          <button
            onClick={() =>
              setUserData((userData) =>
                userData.map((val) => {
                  return { ...val, value: "" };
                })
              )
            }
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
