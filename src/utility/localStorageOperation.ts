import { FormDataShort, FormData } from "../components/data/interfaces";

export const getForms = () => {
  return localStorage.getItem("formData")
    ? JSON.parse(localStorage.getItem("formData") ?? "")
    : [];
};

export const saveForms = (data: FormDataShort[]) => {
  localStorage.setItem("formData", JSON.stringify(data));
};

export const getForm = (id: number) => {
  return localStorage.getItem("form_" + id)
    ? JSON.parse(localStorage.getItem("form_" + id) ?? "{}") ?? null
    : null;
};

export const saveForm = (data: FormData) => {
  localStorage.setItem("form_" + data.id, JSON.stringify(data));
};

export const deleteForm = (id: number) => {
  localStorage.removeItem("form_" + id);
};
