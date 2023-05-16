import { useState } from "react";
import { Link } from "raviger";

import { uniqueId } from "../../utility/uniqueId";
import { FieldData } from "../interfaces/formData";
import EditField from "../common/EditField";
import useFormStateReducer from "../stateManagement/formState";

export default function FormEdit({ formId }: { formId: number }) {
  const { forms, dispatch } = useFormStateReducer();

  let form = forms.find((ele) => ele.id === formId);

  const [newField, setNewField] = useState<FieldData>({
    id: uniqueId(form?.fields ?? []),
    label: "",
    type: "text",
    value: "",
  });

  if (form?.id)
    return (
      <div className="py-8 flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
          <span className="text-xl text-center font-semibold">
            {form.label}
          </span>
          <div className="flex flex-col gap-3 divide-y divide-gray-300">
            {form?.fields?.map((field, fieldIndex) => (
              <div className="flex flex-row items-start gap-3">
                <span className="mt-11 font-semibold text-gray-700">
                  {fieldIndex + 1}.
                </span>
                <EditField
                  key={fieldIndex}
                  field={field}
                  setField={(value) => {
                    console.log(field);

                    if (form)
                      dispatch({
                        type: "EDIT_FIELD",
                        formId: form?.id,
                        field: value,
                      });
                  }}
                  deleteField={() => {
                    if (form)
                      dispatch({
                        type: "DELETE_FIELD",
                        formId: form?.id,
                        fieldId: field.id,
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
                  if (newField.label.length > 0 && form) {
                    dispatch({
                      type: "ADD_FIELD",
                      formId: form.id,
                      field: newField,
                    });

                    setNewField({
                      id: uniqueId(form?.fields ?? []),
                      label: "",
                      type: "text",
                      value: "",
                    });
                  }
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
  else
    return (
      <div className="w-full flex-grow flex items-center justify-center">
        <span className="text-gray-400 text-sm font-semibold">
          No Form Found
        </span>
      </div>
    );
}
