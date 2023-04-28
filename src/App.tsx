import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";

export interface FieldData {
  label: string;
  value: string;
}

export interface FormData {
  label: string;
  fields: FieldData[];
}

const getFormFromLocalData = () => {
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

  const saveFormToLocalData = () => {
    localStorage.setItem("formData", JSON.stringify(forms));
  };

  useEffect(() => {
    if (forms) saveFormToLocalData();
  }, [forms]);

  if ((selectedForm || selectedForm === 0) && forms)
    return (
      <Form
        form={forms[selectedForm]}
        setFormCB={(formValue: FormData) => {
          setForms((forms) =>
            forms
              ? forms.map((form, formIndex) =>
                  formIndex === selectedForm || selectedForm === 0
                    ? formValue
                    : form
                )
              : null
          );
        }}
        removeFormCB={() =>
          setForms((forms) =>
            forms
              ? forms.filter((form, formIndex) => formIndex !== selectedForm)
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
                  onClick={() => setSelectedForm(formIndex)}
                  className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Open
                </button>
                <button
                  onClick={() =>
                    setForms((forms) =>
                      forms
                        ? forms.filter(
                            (_val, valIndex) => valIndex !== formIndex
                          )
                        : null
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
                    { label: formName, fields: [] },
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
