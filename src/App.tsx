import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";

export interface FieldData {
  id: number;
  label: string;
  value: string;
}

export interface FormData {
  id: number;
  label: string;
  fields: FieldData[];
}

const uniqueId = (data: FormData[]): number => {
  let id = Math.random() * 100;

  while (data?.find((ele: FieldData | FormData) => ele.id === id)) {
    return uniqueId(data);
  }
  return id;
};

export const getFormFromLocalData = () => {
  return localStorage.getItem("formData")
    ? JSON.parse(localStorage.getItem("formData") ?? "")
    : null;
};

function App() {
  const [forms, setForms] = useState<FormData[] | null>(() =>
    getFormFromLocalData()
  );
  const [selectedForm, setSelectedForm] = useState<number | null>();
  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (forms) localStorage.setItem("formData", JSON.stringify(forms));
  }, [forms]);

  if ((selectedForm || selectedForm === 0) && forms)
    return (
      <Form
        form={
          forms?.find((val) => val.id === selectedForm) ?? {
            id: uniqueId(forms ?? []),
            label: formName,
            fields: [],
          }
        }
        setFormCB={(formValue: FormData) => {
          setForms((forms) =>
            forms
              ? forms.map((form, formIndex) =>
                  form.id === selectedForm ? formValue : form
                )
              : null
          );
        }}
        removeFormCB={() =>
          setForms((forms) =>
            forms
              ? forms.map((form) => {
                  return form.id === selectedForm
                    ? {
                        ...form,
                        fields: form.fields?.map((ele) => {
                          return { ...ele, value: "" };
                        }),
                      }
                    : form;
                })
              : null
          )
        }
        goBackCB={() => setSelectedForm(null)}
      />
    );
  else
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-8 flex flex-row items-center flex-wrap gap-4">
          {forms?.map((form, formIndex) => (
            <div
              key={formIndex}
              className="w-60 sm:w-80 h-40 bg-white rounded shadow-lg px-5 py-4 flex flex-col justify-center gap-2"
            >
              <label className="pt-4 w-full flex-grow text-lg font-semibold truncate">
                {form.label}
              </label>

              <div className="w-full flex flex-row items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedForm(form.id)}
                  className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Open
                </button>
                <button
                  onClick={() =>
                    setForms((forms) =>
                      forms ? forms.filter((val) => val.id !== form.id) : null
                    )
                  }
                  className="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="w-60 sm:w-80 h-40 bg-white rounded shadow-lg px-5 py-4 flex flex-col justify-center items-start gap-2">
            <label className="text-center w-full font-semibold">
              Create new form
            </label>
            <input
              className="w-full px-3 py-1.5 bg-gray-100"
              placeholder="Enter form name..."
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <button
              onClick={() => {
                formName &&
                  setForms((forms) => [
                    ...(forms ?? []),
                    { id: uniqueId(forms ?? []), label: formName, fields: [] },
                  ]);
                setFormName("");
              }}
              className="ml-auto px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
}

export default App;
