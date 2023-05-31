import { useCallback, useEffect, useState } from "react";
import { Link, navigate } from "raviger";

import PreviewField from "../common/PreviewField";
import {
  DropdownRadioOptions,
  FieldResponse,
  FormResponse,
} from "../interfaces/apiResponses";
import { LoadingIcon } from "../common/svg";
import { getFields, getForm, submitAnswers } from "../common/api";
import useUserAction from "../actions/userActions";
import { toast } from "react-toastify";

export default function Form({ formId }: { formId: number }) {
  const { logout } = useUserAction();
  const [currentField, setCurrentField] = useState(0);
  const [form, setForm] = useState<FormResponse>();
  const [fields, setFields] = useState<FieldResponse[]>();

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const allFieldsFilled =
    fields?.length && fields.length - 1 < currentField ? true : false;

  const fetchFields = useCallback(() => {
    setLoading(true);
    getFields({ id: formId })
      .then((res) => {
        setFields(
          res.results
            ?.map(
              (field: { value: string; kind: "DROPDOWN" | "RADIO" | "TEXT" }) =>
                field.kind === "DROPDOWN"
                  ? { ...field, value: JSON.parse(field.value ?? "") }
                  : field
            )
            ?.filter(
              (field: {
                kind: "DROPDOWN" | "RADIO" | "TEXT";
                options: never[] | undefined | DropdownRadioOptions[];
              }) =>
                (field.kind !== "DROPDOWN" && field.kind !== "RADIO") ||
                field.options?.find((val) => val.label)
            )
        );

        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.detail === "Invalid token.") logout();
        toast.error(err?.message ?? "Error Occured During Network Call");
        console.log(err);
      });
  }, [formId, logout]);

  const fetchForm = useCallback(() => {
    setLoading(true);
    getForm({ formId })
      .then((res) => {
        setLoading(false);
        setForm(res);
        fetchFields();
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.detail === "Invalid token.") logout();
        toast.error(err?.message ?? "Error Occured During Network Call");
        console.log(err);
      });
  }, [formId, fetchFields, logout]);

  useEffect(() => {
    fetchForm();
  }, [formId, fetchForm]);

  const saveAnswers = () => {
    setSaveLoading(true);
    submitAnswers({
      formId,
      body: {
        answers: fields?.map((val) => {
          return { value: JSON.stringify(val.value), form_field: val.id };
        }),
      },
    })
      .then((res) => {
        setSaveLoading(false);
        console.log(res);
        navigate("/submitted");
      })
      .catch((err) => {
        setSaveLoading(false);
        console.log(err);
        toast.error("Error submitting form");
      });
  };

  if (loading)
    return (
      <div className="w-full flex-grow flex items-center justify-center">
        <LoadingIcon className="h-5" />
      </div>
    );
  else if (form)
    return (
      <div className="py-7 flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-1 items-start">
          <span className="text-xl text-center font-semibold">
            {form.title}
          </span>
          <span className="mb-3 text-gray-400 text-sm font-semibold">
            {form.description}
          </span>
          {fields?.map(
            (field: FieldResponse, fieldIndex: number) =>
              (allFieldsFilled || fieldIndex === currentField) && (
                <div className="w-full flex flex-row items-end gap-4">
                  <PreviewField
                    key={fieldIndex}
                    field={field}
                    setValue={(value) => {
                      setFields((fields) => {
                        return fields?.map((field1) => {
                          return field1.id === field.id ? value : field1;
                        });
                      });
                    }}
                  />
                  {!allFieldsFilled && (
                    <button
                      onClick={() =>
                        setCurrentField((currentField) => currentField + 1)
                      }
                      className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                    >
                      Next
                    </button>
                  )}
                </div>
              )
          )}

          <div className="w-full mt-4 flex flex-row items-center justify-between gap-4">
            {allFieldsFilled && (
              <button
                onClick={() => {
                  if (form) {
                    setFields(
                      fields?.map((field) => {
                        return field.kind === "DROPDOWN"
                          ? { ...field, value: [] }
                          : field.kind === "RADIO"
                          ? {
                              ...field,
                              value: 0,
                            }
                          : { ...field, value: "" };
                      })
                    );
                    setCurrentField(0);
                  }
                }}
                className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Clear data
              </button>
            )}
            <div className="flex flex-row justify-end items-center gap-2">
              <Link
                href={"/preview"}
                className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Back
              </Link>

              {allFieldsFilled && (
                <button
                  onClick={saveAnswers}
                  className="h-10 w-24 flex items-center justify-center text-white font-semibold bg-green-500 hover:bg-green-600 rounded-lg"
                >
                  {saveLoading ? (
                    <LoadingIcon style={{ height: "17px" }} />
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="w-full flex-grow flex items-center justify-center">
        <span className="text-gray-400 text-sm font-semibold">
          No Form Found
        </span>
      </div>
    );
}
