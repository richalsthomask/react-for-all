import { Link } from "raviger";

import useFormStateReducer from "../stateManagement/formState";

export default function FormListPreview() {
  const { forms } = useFormStateReducer();

  return (
    <div className="flex-grow w-full bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-8 flex flex-row items-center flex-wrap gap-4">
        {forms?.length === 0 && (
          <div className="w-full py-20 flex items-center justify-center text-gray-400 font-semibold text-sm">
            No forms found
          </div>
        )}
        <div className="mt-10 flex flex-row items-center justify-center flex-wrap gap-5 w-full h-full">
          {forms.map((form, formIndex) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
