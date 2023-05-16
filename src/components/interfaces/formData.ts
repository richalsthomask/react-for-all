export type FieldData =
  | textField
  | dateField
  | timeField
  | dropdownField
  | radioField
  | checkField;

export interface textField {
  id: number;
  type: "text";
  label: string;
  value: string;
}

export interface dateField {
  id: number;
  type: "date";
  label: string;
  value: string;
}

export interface timeField {
  id: number;
  type: "time";
  label: string;
  value: string;
}

export interface dropdownField {
  id: number;
  type: "dropdown";
  label: string;
  value: number[] | never[];
  options: { id: number; label: string }[] | never[];
}

export interface radioField {
  id: number;
  type: "radio";
  label: string;
  value: number | undefined;
  options: { id: number; label: string }[] | never[];
}

export interface checkField {
  id: number;
  type: "checkbox";
  label: string;
  value: boolean;
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
