import { checkField } from "../../data/interfaces";

export default function CheckboxInput({
  field,
  setValue,
  className,
}: {
  field: checkField;
  setValue: (value: checkField) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <input
        type={field.type}
        checked={field.value}
        onChange={() =>
          setValue({ ...field, value: field.value ? false : true })
        }
        className="mt-2 rounded-md border-2 border-gray-200 h-5 w-5"
      />
    </div>
  );
}
