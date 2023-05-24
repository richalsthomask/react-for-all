import { useEffect, useState } from "react";
import { Link } from "raviger";

import { uniqueId } from "../../utility/uniqueId";
import { getForm, saveForm } from "../../utility/localStorageOperation";
import { FormData } from "../../interfaces";

export default function FormEdit({ formId }: { formId: number }) {
  const [form, setForm] = useState<FormData | null>(() => getForm(formId));
  const [newField, setNewField] = useState<{
    label: string;
    type: string;
  }>({ label: "", type: "text" });

  useEffect(() => {
    if (form) saveForm(form);
  }, [form]);

  const handleFieldChange = (
    id: number,
    field: "label" | "type",
    value: string
  ) => {
    form?.fields &&
      setForm({
        ...form,
        fields: form.fields.map((ele) =>
          ele.id === id ? { ...ele, [field]: value } : ele
        ),
      });
  };

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
        <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
          <span className="text-xl text-center font-semibold">
            {form.label}
          </span>
          {form?.fields?.map((field, fieldIndex) => (
            <div
              key={fieldIndex}
              className="w-full flex flex-row items-end gap-2"
            >
              <div className="w-full flex flex-col">
                <span className="text-sm text-gray-600">label</span>
                <input
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(field.id, "label", e.target.value)
                  }
                  className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
                />
              </div>
              <div className="w-full flex flex-row items-center gap-2">
                <div className="w-full flex flex-col">
                  <span className="text-sm text-gray-600">type</span>
                  <select
                    value={field.type}
                    className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
                    onChange={(e) =>
                      handleFieldChange(field.id, "type", e.target.value)
                    }
                  >
                    {["text", "date"].map((val) => (
                      <option value={val} key={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    fields: form.fields?.filter((ele) => ele.id !== field.id),
                  })
                }
                className="px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="mt-3 w-full flex flex-col items-start gap-1">
            <label className="font-semibold">Add new field</label>

            <div className="mt-1 w-full flex flex-row items-end gap-2">
              <div className="w-full flex flex-col">
                <span className="text-sm text-gray-600">label</span>
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
                <span className="text-sm text-gray-600">type</span>
                <select
                  value={newField.type}
                  className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
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
                    setForm({
                      ...form,
                      fields: [
                        ...form.fields,
                        {
                          id: uniqueId(form.fields),
                          label: newField.label,
                          type: newField.type,
                          value: "",
                        },
                      ],
                    });

                    setNewField({ label: "", type: "text" });
                  }
                }}
                className="px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-5">
            <Link
              href={"/"}
              className="mt-2 px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    );
}
