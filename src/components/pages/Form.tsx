import { useState } from "react";
import { Link } from "raviger";

import { FieldData } from "../interfaces/formData";
import PreviewField from "../common/PreviewField";
import useFormStateReducer from "../stateManagement/formState";

export default function Form({ formId }: { formId: number }) {
  const { forms, dispatch } = useFormStateReducer();
  const [currentField, setCurrentField] = useState(0);

  let form = forms.find((val) => val.id === formId);

  const allFieldsFilled =
    form?.fields.length && form?.fields.length - 1 < currentField
      ? true
      : false;

  if (form)
    return (
      <div className="py-7 flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
          <span className="text-xl text-center font-semibold">
            {form.label}
          </span>
          {form?.fields?.map(
            (field: FieldData, fieldIndex: number) =>
              (allFieldsFilled || fieldIndex === currentField) && (
                <div className="w-full flex flex-row items-end gap-4">
                  <PreviewField
                    key={fieldIndex}
                    field={field}
                    setValue={(value) => {
                      if (form) {
                        dispatch({
                          type: "EDIT_FIELD",
                          formId: form.id,
                          field: value,
                        });
                      }
                    }}
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
                  if (form) {
                    dispatch({ type: "CLEAR_FORM_VALUES", formId: form.id });

                    setCurrentField(0);
                  }
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
  else
    return (
      <div className="w-full flex-grow flex items-center justify-center">
        <span className="text-gray-400 text-sm font-semibold">
          No Form Found
        </span>
      </div>
    );
}
