import { useState } from "react";
import { Link } from "raviger";

import { FormDataShort } from "../interfaces/formData";
import useFormStateReducer from "../stateManagement/formState";

export default function FormList({ searchString }: { searchString: string }) {
  const { forms, dispatch } = useFormStateReducer();
  const [formName, setFormName] = useState("");

  return (
    <div className="flex-grow w-full bg-gray-100">
      {searchString && (
        <div className="px-6 text-2xl font-bold text-gray-400 italic">
          Search result for "{searchString}"
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-8 flex flex-row items-center flex-wrap gap-4">
        {forms?.length === 0 && (
          <div className="w-full py-20 flex items-center justify-center text-gray-400 font-semibold text-sm">
            No forms found
          </div>
        )}
        <div className="mt-10 flex flex-row items-center justify-center flex-wrap gap-5 w-full h-full">
          {forms
            ?.filter((val: FormDataShort) =>
              searchString ? val.label.includes(searchString) : true
            )
            .map((form, formIndex) => (
              <div
                key={formIndex}
                className="w-60 sm:w-80 h-40 bg-white rounded shadow-lg px-5 py-4 flex flex-col justify-center gap-2"
              >
                <label className="pt-4 w-full flex-grow text-lg font-semibold truncate">
                  {form.label}
                </label>

                <div className="w-full flex flex-row items-center justify-end gap-2">
                  <Link
                    href={"/preview/" + form.id}
                    className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                  >
                    Open
                  </Link>
                  <Link
                    href={"/form/" + form.id}
                    className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      dispatch({ type: "DELETE_FORM", id: form.id });
                    }}
                    className="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {!searchString && (
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
                  if (formName?.length > 0) {
                    dispatch({ type: "ADD_FORM", label: formName });
                    setFormName("");
                  }
                }}
                className="ml-auto px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
