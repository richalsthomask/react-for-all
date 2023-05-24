import { FieldData } from "../data/interfaces";
import CheckboxInput from "./fields/CheckboxInput";
import DropdownInput from "./fields/DropdownInput";
import RadioInput from "./fields/RadioInput";
import TextInput from "./fields/TextInput";

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
        <TextInput {...{ field, setValue }} />
      ) : field.type === "checkbox" ? (
        <CheckboxInput {...{ field, setValue }} className="w-full" />
      ) : field.type === "radio" ? (
        <RadioInput
          className="w-full flex flex-row items-center gap-3 flex-wrap"
          {...{ field, setValue }}
        />
      ) : field.type === "dropdown" ? (
        <DropdownInput {...{ field, setValue }} />
      ) : null}
    </div>
  );
}
