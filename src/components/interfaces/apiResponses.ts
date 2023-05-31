import exp from "constants";

export type LoginResponse =
  | undefined
  | void
  | {
      token: string;
    };

export type FormResponse = {
  id: number;
  title: string;
  description: string;
  is_public: boolean;
  created_by: number;
  created_date: string;
  modified_date: string;
};

export type DropdownRadioOptions = {
  id: number;
  label: string;
  value: string;
};

export type FieldResponse =
  | TextFieldsResponse
  | DropdownFieldsResponse
  | RadioResponse;

export type TextFieldsResponse = {
  id: number;
  label: string;
  kind: "TEXT";
  value: string;
};

export type DropdownFieldsResponse = {
  id: number;
  label: string;
  kind: "DROPDOWN";
  options: DropdownRadioOptions[] | never[];
  value: never[] | number[];
};

export type RadioResponse = {
  id: number;
  label: string;
  kind: "RADIO";
  options: DropdownRadioOptions[] | never[];
  value: number | null;
};
