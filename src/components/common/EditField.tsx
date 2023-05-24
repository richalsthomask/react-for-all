import { uniqueId } from "../../utility/uniqueId";
import { fieldsOptions } from "../data/fieldsOptions";
import { FieldData } from "../data/interfaces";

export default function EditField({
  field,
  setField,
  deleteField,
  warning,
}: {
  field: FieldData;
  setField: (field: FieldData) => void;
  deleteField: null | ((id: number) => void);
  warning?: boolean;
}) {
  return (
    <div className="py-4 w-full flex flex-col">
      <div className="w-full flex flex-row items-end gap-2">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row items-end justify-between gap-2">
            <span className="text-sm text-gray-600 font-semibold">label</span>
            {warning && (
              <span className="text-xs text-red-600">
                {field.label ? "" : "Fill this field"}
              </span>
            )}
          </div>
          <input
            value={field.label}
            onChange={(e) => setField({ ...field, label: e.target.value })}
            className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
          />
        </div>
        <div className="w-full flex flex-row items-center gap-2">
          <div className="w-full flex flex-col">
            <span className="text-sm text-gray-600 font-semibold">type</span>
            <select
              value={field.type}
              onChange={(e) => {
                let selectedValue = e.target.value;
                setField(
                  selectedValue === "dropdown"
                    ? {
                        ...field,
                        type: "dropdown",
                        options: [{ id: uniqueId([]), label: "" }],
                        value: [],
                      }
                    : selectedValue === "radio"
                    ? {
                        ...field,
                        type: selectedValue,
                        options: [{ id: uniqueId([]), label: "" }],
                        value: undefined,
                      }
                    : selectedValue === "time" ||
                      selectedValue === "text" ||
                      selectedValue === "date"
                    ? {
                        ...field,
                        type: selectedValue,
                        value: "",
                      }
                    : selectedValue === "checkbox"
                    ? {
                        ...field,
                        type: selectedValue,
                        value: false,
                      }
                    : field
                );
              }}
              className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
            >
              {fieldsOptions.map((val, index) => (
                <option value={val.value} key={index}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {deleteField && (
          <button
            onClick={() => deleteField(field.id)}
            className="px-4 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Delete
          </button>
        )}
      </div>
      {(field.type === "radio" || field.type === "dropdown") && (
        <div className="flex flex-col mr-10">
          <div className="w-full flex flex-row items-end justify-between gap-2">
            <span className="mt-3 text-sm text-gray-600 font-semibold">
              Options
            </span>
            {warning && (
              <span className="sm:mr-10 text-xs text-red-600">
                {field.options?.length > 0 &&
                field.options.find((val) => val.label)
                  ? ""
                  : "Add atleast one non-empty option"}
              </span>
            )}
          </div>

          {field.options?.map((option, optionIndex) => (
            <div className="mt-1 flex flex-row items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">
                {optionIndex + 1}.
              </span>
              <input
                className="flex-grow px-3 py-1.5 w-full rounded-md border-2 border-gray-200"
                value={option.label}
                onChange={(e) => {
                  setField({
                    ...field,
                    options: field.options.map((ele, index) =>
                      index === optionIndex
                        ? { ...ele, label: e.target.value }
                        : ele
                    ),
                  });
                }}
              />
              <button
                onClick={() => {
                  setField(
                    field.type === "dropdown"
                      ? {
                          ...field,
                          options: field.options.filter(
                            (ele) => ele.id !== option.id
                          ),
                          value: field.value.filter((ele) => ele !== option.id),
                        }
                      : {
                          ...field,
                          options: field.options.filter(
                            (ele) => ele.id !== option.id
                          ),
                          value:
                            field.value === option.id ? undefined : field.value,
                        }
                  );
                }}
                className="px-4 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
          <div>
            <button
              onClick={() => {
                setField({
                  ...field,
                  options: [
                    ...field.options,
                    { id: uniqueId(field.options), label: "" },
                  ],
                });
              }}
              className="mt-3 px-4 py-1.5 text-white font-semibold bg-green-500 hover:bg-green-600 rounded-lg"
            >
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
