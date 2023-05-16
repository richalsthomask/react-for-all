import { FieldData } from "../interfaces/formData";

export default function PreviewField({
  field,
  setValue,
}: {
  field: FieldData;
  setValue: (value: FieldData) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <span className="font-semibold text-gray-600">{field.label}</span>
      {field.type === "text" ||
      field.type === "date" ||
      field.type === "time" ? (
        <input
          type={field.type}
          value={field.value}
          onChange={(e) => {
            setValue({ ...field, value: e.target.value });
          }}
          className="w-full rounded-md border-2 border-gray-200 px-2 py-1.5"
        />
      ) : field.type === "checkbox" ? (
        <div className="w-full">
          <input
            type={field.type}
            checked={field.value}
            onChange={() =>
              setValue({ ...field, value: field.value ? false : true })
            }
            className="mt-2 rounded-md border-2 border-gray-200 h-5 w-5"
          />
        </div>
      ) : field.type === "radio" ? (
        <div className="w-full flex flex-row items-center gap-3 flex-wrap">
          {field.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex flex-row items-center gap-2">
              <input
                type="radio"
                checked={field.value === option.id}
                onChange={() => {
                  setValue({ ...field, value: option.id });
                }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      ) : field.type === "dropdown" ? (
        <div className="">
          <select
            value={""}
            className="w-full rounded-md border-2 border-gray-200 px-2 py-1.5"
            onChange={(e) => {
              let selectedValue = Number(e.target.value);
              let selectedArray = field.value.length > 0 ? field.value : [];
              setValue({
                ...field,
                value: selectedArray.includes(selectedValue)
                  ? field.value.filter((val) => val !== selectedValue)
                  : [...field.value, selectedValue],
              });
            }}
          >
            <option disabled selected value="">
              Select
            </option>
            {field.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="mt-3 bg-yellow-100 px-4 py-3 rounded-md">
            <span className="text-gray-600 text-sm mb-2">Selected options</span>
            <div className="mt-1 flex flex-row items-center gap-3 flex-wrap">
              {field.value.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="px-4 py-1.5 rounded-full bg-gray-600 text-white text-sm font-semibold"
                >
                  {field.options.find((ele) => ele.id === option)?.label}
                  <button
                    onClick={() => {
                      setValue({
                        ...field,
                        value: field.value.filter((val) => val !== option),
                      });
                    }}
                    className="absolute translate-x-2 -translate-y-1.5 text-red-500 hover:text-red-700 text-2xl"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 503.021 503.021"
                    >
                      <g>
                        <g>
                          <path
                            d="M491.613,75.643l-64.235-64.235c-15.202-15.202-39.854-15.202-55.056,0L251.507,132.222L130.686,11.407
			c-15.202-15.202-39.853-15.202-55.055,0L11.401,75.643c-15.202,15.202-15.202,39.854,0,55.056l120.821,120.815L11.401,372.328
			c-15.202,15.202-15.202,39.854,0,55.056l64.235,64.229c15.202,15.202,39.854,15.202,55.056,0l120.815-120.814l120.822,120.814
			c15.202,15.202,39.854,15.202,55.056,0l64.235-64.229c15.202-15.202,15.202-39.854,0-55.056L370.793,251.514l120.82-120.815
			C506.815,115.49,506.815,90.845,491.613,75.643z"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
