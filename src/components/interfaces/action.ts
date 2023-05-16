import { FieldData } from "./formData";

export type Action =
  | DeleteForm
  | AddForm
  | AddField
  | EditField
  | DeleteField
  | ClearFormValues;

interface DeleteForm {
  type: "DELETE_FORM";
  id: number;
}

interface AddForm {
  type: "ADD_FORM";
  label: string;
}

interface AddField {
  type: "ADD_FIELD";
  formId: number;
  field: FieldData;
}

interface EditField {
  type: "EDIT_FIELD";
  formId: number;
  field: FieldData;
}

interface DeleteField {
  type: "DELETE_FIELD";
  formId: number;
  fieldId: number;
}

interface ClearFormValues {
  type: "CLEAR_FORM_VALUES";
  formId: number;
}
