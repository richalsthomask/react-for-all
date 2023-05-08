import React, { useState } from "react";
import { FieldData, FormData } from "./App";

const uniqueId = (data: FieldData[]): number => {
  let id = Math.random() * 100;
  if (data?.find((ele: FieldData | FormData) => ele.id === id)) {
    return uniqueId(data);
  } else return id;
};

export default function Form({
  form,
  setFormCB,
  removeFormCB,
  goBackCB,
}: {
  form: FormData;
  setFormCB: (formValue: FormData) => void;
  removeFormCB: () => void;
  goBackCB: () => void;
}) {
  const [newField, setNewField] = useState({ label: "", type: "string" });

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
        <span className="text-xl text-center font-semibold">{form.label}</span>
        {form?.fields?.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="w-full flex flex-col items-start gap-1"
          >
            <label>{field.label}</label>

            <div className="w-full flex flex-row items-center gap-2">
              <input
                value={field.value}
                type={field.type}
                onChange={(e) =>
                  setFormCB({
                    ...form,
                    fields: form.fields?.map((ele, eleIndex) =>
                      eleIndex === fieldIndex
                        ? { ...ele, value: e.target.value }
                        : ele
                    ),
                  })
                }
                className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
              />

              <button
                onClick={() =>
                  setFormCB({
                    ...form,
                    fields: form.fields?.filter(
                      (_ele, eleIndex) => eleIndex !== fieldIndex
                    ),
                  })
                }
                className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 w-full flex flex-col items-start gap-1">
          <label className="font-semibold">Add new field</label>

          <div className="mt-2 w-full flex flex-row items-end gap-2">
            <div className="w-full flex flex-col">
              <span className="text-gray-700">Label</span>
              <input
                value={newField.label}
                onChange={(e) =>
                  setNewField((newField) => {
                    return { ...newField, label: e.target.value };
                  })
                }
                className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
              />
            </div>
            <div className="w-full flex flex-col">
              <span className="text-gray-700">type</span>
              <select
                value={newField.type}
                className="flex-grow px-3 py-2 w-full rounded-md border-2 border-gray-200"
                onChange={(e) => {
                  setNewField((newField) => {
                    return { ...newField, type: e.target.value };
                  });
                }}
              >
                {["text", "date"].map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                if (newField.label.length > 0) {
                  console.log(form);
                  setFormCB({
                    ...form,
                    fields: [
                      ...form.fields,
                      {
                        id: uniqueId(form.fields),
                        label: newField.label,
                        value: "",
                        type: newField.type,
                      },
                    ],
                  });

                  setNewField({ label: "", type: "string" });
                }
              }}
              className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <button
            onClick={goBackCB}
            className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={removeFormCB}
            className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Clear data
          </button>
        </div>
      </div>
    </div>
  );
}
