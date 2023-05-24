import { dateField, textField, timeField } from "../../data/interfaces";

export default function TextInput({
  field,
  setValue,
}: {
  field: textField | dateField | timeField;
  setValue: (value: textField | dateField | timeField) => void;
}) {
  return (
    <input
      type={field.type}
      value={field.value}
      onChange={(e) => {
        setValue({ ...field, value: e.target.value });
      }}
      className="w-full rounded-md border-2 border-gray-200 px-2 py-1.5"
    />
  );
}
