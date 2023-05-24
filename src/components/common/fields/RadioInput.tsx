import { radioField } from "../../data/interfaces";

export default function RadioInput({
  field,
  setValue,
  className,
}: {
  field: radioField;
  setValue: (value: radioField) => void;
  className?: string;
}) {
  return (
    <div className={className}>
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
  );
}
