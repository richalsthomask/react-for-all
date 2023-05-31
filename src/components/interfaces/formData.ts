export type FieldData = textField | dropdownField | radioField;

export interface textField {
  kind: "TEXT";
  label: string;
  value: string;
}

export interface dropdownField {
  kind: "DROPDOWN";
  label: string;
  value: number[] | never[];
  options: { id: number; label: string }[] | never[];
}

export interface radioField {
  kind: "RADIO";
  label: string;
  value: number | undefined;
  options: { id: number; label: string }[] | never[];
}

export interface FormData {
  id: number;
  label: string;
  fields: FieldData[] | any[];
}

export interface FormDataShort {
  id: number;
  label: string;
}
