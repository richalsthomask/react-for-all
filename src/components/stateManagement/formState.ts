import { useEffect, useReducer } from "react";
import { Action } from "../interfaces/action";
import { FormData } from "../interfaces/formData";
import { uniqueId } from "../../utility/uniqueId";

const reducer = (state: FormData[], action: Action) => {
  switch (action.type) {
    case "DELETE_FORM":
      return state.filter((form) => form.id !== action.id);
    case "ADD_FORM":
      return [
        ...state,
        { id: uniqueId(state), label: action.label, fields: [] },
      ];
    case "ADD_FIELD":
      return state.map((form) =>
        form.id === action.formId
          ? {
              ...form,
              fields: [...form.fields, action.field],
            }
          : form
      );
    case "EDIT_FIELD":
      return state.map((form) =>
        form.id === action.formId
          ? {
              ...form,
              fields: form.fields.map((field) =>
                field.id === action.field.id ? action.field : field
              ),
            }
          : form
      );
    case "DELETE_FIELD":
      return state.map((form) =>
        form.id === action.formId
          ? {
              ...form,
              fields: form.fields.filter(
                (field) => field.id !== action.fieldId
              ),
            }
          : form
      );
    case "CLEAR_FORM_VALUES":
      return state.map((form) =>
        form.id === action.formId
          ? {
              ...form,
              fields: form.fields.map((ele) => {
                return ele.type === "dropdown"
                  ? {
                      ...ele,
                      value: [],
                    }
                  : ele.type === "radio"
                  ? {
                      ...ele,
                      value: undefined,
                    }
                  : ele.type === "checkbox"
                  ? {
                      ...ele,
                      value: false,
                    }
                  : {
                      ...ele,
                      value: "",
                    };
              }),
            }
          : form
      );

    default:
      return state;
  }
};

export default function useFormStateReducer() {
  const [forms, dispatch] = useReducer(
    reducer,
    localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData") ?? "[]")
      : []
  );

  useEffect(() => {
    forms && localStorage.setItem("formData", JSON.stringify(forms));
  }, [forms]);

  return { forms, dispatch };
}
