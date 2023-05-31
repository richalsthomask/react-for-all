import { useState } from "react";
import { uniqueId } from "../../utility/uniqueId";
import { fieldsOptions } from "../data/fieldsOptions";
import { FieldResponse } from "../interfaces/apiResponses";

export default function EditField({
  field,
  setField,
  deleteField,
}: {
  field: FieldResponse;
  setField: (field: FieldResponse) => void;
  deleteField: null | (() => void);
}) {
  const [deleteFieldPopup, setDeleteFieldPopup] = useState(false);
  return (
    <div className="py-4 w-full flex flex-col">
      <div className="w-full flex flex-row items-end gap-2">
        <div className="w-full flex flex-col">
          <span className="text-sm text-gray-600 font-semibold">label</span>
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
              value={field.kind}
              onChange={(e) => {
                let selectedValue = e.target.value;
                setField(
                  selectedValue === "DROPDOWN"
                    ? {
                        ...field,
                        kind: "DROPDOWN",
                        options: [{ id: uniqueId([]), label: "", value: "" }],
                        value: [],
                      }
                    : selectedValue === "RADIO"
                    ? {
                        ...field,
                        kind: selectedValue,
                        options: [{ id: uniqueId([]), label: "", value: "" }],
                        value: null,
                      }
                    : selectedValue === "TEXT"
                    ? {
                        ...field,
                        kind: selectedValue,
                        value: "",
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
            onClick={() => setDeleteFieldPopup(true)}
            className="px-4 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Delete
          </button>
        )}
      </div>
      {(field.kind === "RADIO" || field.kind === "DROPDOWN") && (
        <div className="flex flex-col mr-10">
          <span className="mt-3 text-sm text-gray-600 font-semibold">
            Options
          </span>
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
                        ? {
                            ...ele,
                            label: e.target.value,
                            value: e.target.value,
                          }
                        : ele
                    ),
                  });
                }}
              />
              <button
                onClick={() => {
                  setField(
                    field.kind === "DROPDOWN"
                      ? {
                          ...field,
                          options: field.options.filter(
                            (ele) => ele.id !== option.id
                          ),
                          value: field.value?.filter(
                            (ele) => ele !== option.id
                          ),
                        }
                      : {
                          ...field,
                          options: field.options.filter(
                            (ele) => ele.id !== option.id
                          ),
                          value: field.value === option.id ? null : field.value,
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
                    { id: uniqueId(field.options), label: "", value: "" },
                  ],
                });
              }}
              className="mt-3 px-4 py-1.5 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Add Option
            </button>
          </div>
        </div>
      )}
      {deleteFieldPopup && (
        <div
          onClick={() => {
            setDeleteFieldPopup(false);
          }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="px-5 py-3 bg-white rounded-lg flex flex-col justify-center items-center"
          >
            <span className="text-lg font-semibold text-gray-700 mt-5">
              Are you sure you want to delete this field?
            </span>
            <div className="w-full flex flex-row justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setDeleteFieldPopup(false);
                }}
                className="px-4 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDeleteFieldPopup(false);
                  deleteField && deleteField();
                }}
                className="px-4 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
