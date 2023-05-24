import { useEffect, useState } from "react";
import { Link } from "raviger";

import { uniqueId } from "../../utility/uniqueId";
import { getForm, saveForm } from "../../utility/localStorageOperation";
import { FieldData, FormData } from "../data/interfaces";
import EditField from "../common/EditField";

export default function FormEdit({ formId }: { formId: number }) {
  const [form, setForm] = useState<FormData | null>(() => getForm(formId));
  const [newField, setNewField] = useState<FieldData>({
    id: uniqueId(form?.fields ?? []),
    label: "",
    type: "text",
    value: "",
  });

  useEffect(() => {
    if (form) saveForm(form);
  }, [form]);

  const errorFields = form?.fields?.filter(
    (field) =>
      !field.label ||
      ((field.type === "radio" || field.type === "dropdown") &&
        !field.options?.find((option) => option.label))
  );

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
      <div className="py-8 flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
          <div className="flex flex-row items-center gap-3 justify-between w-full">
            <span className="text-xl text-center font-semibold">
              {form.label}
            </span>
            {errorFields?.length && errorFields?.length > 0 ? (
              <span className="text-sm text-red-400">
                * Input fields with unresolved errors will not be shown on
                preview
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-3 divide-y divide-gray-300">
            {form?.fields?.map((field, fieldIndex) => (
              <div className="flex flex-row items-start gap-3">
                <span className="mt-11 font-semibold text-gray-700">
                  {fieldIndex + 1}.
                </span>
                <EditField
                  warning={true}
                  key={fieldIndex}
                  field={field}
                  setField={(value) => {
                    setForm({
                      ...form,
                      fields: form.fields?.map((ele) =>
                        ele.id === field.id ? value : ele
                      ),
                    });
                  }}
                  deleteField={() => {
                    setForm({
                      ...form,
                      fields: form.fields?.filter((ele) => ele.id !== field.id),
                    });
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 w-full flex flex-col items-start gap-1">
            <div className="w-full flex flex-row items-end justify-between gap-3 border-b-2 border-gray-300 pb-1">
              <label className="font-semibold text-lg">Add new field</label>
              <button
                onClick={() => {
                  setForm({
                    ...form,
                    fields: [...form.fields, newField],
                  });

                  setNewField({
                    id: uniqueId(form?.fields ?? []),
                    label: "",
                    type: "text",
                    value: "",
                  });
                }}
                className="px-4 py-1.5 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Add Field
              </button>
            </div>
            <EditField
              field={newField}
              setField={setNewField}
              deleteField={null}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-end gap-5">
            <Link
              href={"/"}
              className="mt-2 px-6 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    );
}
