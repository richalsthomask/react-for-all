import React, { useEffect, useState } from "react";
import { getForm, saveForm } from "../../utility/localStorageOperation";
import { FormData } from "../../interfaces";
import { Link } from "raviger";

export default function Form({ formId }: { formId: number }) {
  const [form, setForm] = useState<FormData | null>(() => getForm(formId));
  const [currentField, setCurrentField] = useState(0);

  useEffect(() => {
    if (form) saveForm(form);
  }, [form]);

  const allFieldsFilled = form?.fields.find((val) => !val.value)
    ? form?.fields.length - 1 < currentField
      ? true
      : false
    : true;

  if (form === null)
    return (
      <div className="w-full flex-grow flex items-center justify-center">
        <span className="text-gray-400 text-sm font-semibold">
          No Form Found
        </span>
      </div>
    );
  else
    return (
      <div className="flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-sm w-full mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
          <span className="text-xl text-center font-semibold">
            {form.label}
          </span>
          {form?.fields?.map(
            (field, fieldIndex) =>
              (allFieldsFilled || fieldIndex === currentField) && (
                <div
                  key={fieldIndex}
                  className="mt-2 w-full flex flex-col items-start gap-1.5"
                >
                  <label className="font-semibold text-gray-700">
                    {field.label}
                  </label>

                  <div className="w-full flex flex-row justify-between gap-3">
                    <input
                      value={field.value}
                      type={field.type}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          fields: form.fields?.map((ele) =>
                            ele.id === field.id
                              ? { ...ele, value: e.target.value }
                              : ele
                          ),
                        })
                      }
                      onKeyDown={(key) =>
                        key.key === "Enter" &&
                        setCurrentField((currentField) => currentField + 1)
                      }
                      className={
                        "rounded-md border-2 border-gray-200 " +
                        (field.type === "checkbox"
                          ? "mx-3 p-2"
                          : "w-full px-3 py-1.5 ")
                      }
                    />
                    {!allFieldsFilled && (
                      <button
                        onClick={() =>
                          setCurrentField((currentField) => currentField + 1)
                        }
                        className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )
          )}

          <div className="flex flex-row items-center gap-5">
            <Link
              href={"/preview"}
              className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Back
            </Link>
            {allFieldsFilled && (
              <button
                onClick={() => {
                  setForm({
                    ...form,
                    fields: form.fields?.map((ele) => {
                      return { ...ele, value: "" };
                    }),
                  });
                  setCurrentField(0);
                }}
                className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Clear data
              </button>
            )}
          </div>
        </div>
      </div>
    );
}
