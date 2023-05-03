export interface FieldData {
  id: number;
  type: string;
  label: string;
  value: string;
}

export interface FormData {
  id: number;
  label: string;
  fields: FieldData[] | [];
}

export interface FormDataShort {
  id: number;
  label: string;
}
