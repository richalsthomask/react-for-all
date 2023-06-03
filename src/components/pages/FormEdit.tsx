import { useCallback, useEffect, useState } from "react";
import { Link } from "raviger";
import { Draggable } from "react-drag-reorder";

import EditField from "../common/EditField";
import {
  deleteField,
  getFields,
  getForm,
  patchField,
  postField,
} from "../common/api";
import useUserAction from "../actions/userActions";
import { FieldResponse, FormResponse } from "../interfaces/apiResponses";
import { LoadingIcon } from "../common/svg";
import { toast } from "react-toastify";

export default function FormEdit({ formId }: { formId: number }) {
  const { handleError, logout } = useUserAction();
  const [form, setForm] = useState<FormResponse>();
  const [fields, setFields] = useState<FieldResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [newField, setNewField] = useState<FieldResponse>({
    id: 0,
    label: "",
    kind: "TEXT",
    value: "",
  });
  const [warning, setWarning] = useState({
    label: "",
    kind: "",
    options: "",
  });

  const fetchFields = useCallback(() => {
    setLoading(true);
    getFields({ id: formId })
      .then((res) => {
        setFields(res.results);
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

  const createField = () => {
    setLoadingSave(true);
    postField({
      id: formId,
      body: {
        ...newField,
        value:
          newField.kind !== "TEXT"
            ? JSON.stringify(newField.value)
            : newField.value,
      },
    })
      .then((res) => {
        console.log(res);
        setLoadingSave(false);
        fetchFields();
        setNewField({
          id: 0,
          label: "",
          kind: "TEXT",
          value: "",
        });
        toast.success("Field created successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoadingSave(false);
        handleError(err);
        setWarning({
          label: err?.label?.[0] ?? "",
          kind: err?.kind?.[0] ?? "",
          options: err?.options?.[0] ?? "",
        });
      });
  };

  const deleteFieldapi = (id: number) => {
    setLoadingSave(true);
    deleteField({ formId, fieldId: id })
      .then((res) => {
        console.log(res);
        setLoadingSave(false);
        fetchFields();
        toast.success("Field deleted successfully");
      })
      .catch((err) => {
        if (err?.message === "Unexpected end of JSON input") {
          setLoadingSave(false);
          fetchFields();
          toast.success("Field deleted successfully");
        } else {
          console.log(err);
          setLoadingSave(false);
          handleError(err);
        }
      });
  };

  const updateFields = () => {
    let savedFields = 0;

    fields?.length > 0 && setLoadingSave(true);
    fields?.map((field) => {
      patchField({
        formId,
        fieldId: field.id,
        body: field,
      })
        .then((res) => {
          savedFields++;
          if (savedFields === fields.length) {
            setLoadingSave(false);
            fetchFields();
            toast.success("Fields updated successfully");
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          savedFields++;
          if (savedFields === fields.length) setLoadingSave(false);
          handleError(err);
        });
      return true;
    });
  };

  if (loading)
    return (
      <div className="py-8 flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-3 items-start">
          <span className="text-xl text-center font-semibold">Loading...</span>
        </div>
      </div>
    );
  else if (form?.id)
    return (
      <div className="py-8 flex-grow w-full bg-gray-100 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-6 pt-4 pb-8 rounded-lg bg-white shadow-lg flex flex-col gap-1 items-start">
          <div className="flex flex-row items-center justify-between w-full flex-wrap">
            <span className="text-xl text-center font-semibold">
              {form.title}
            </span>
            <div className="flex flex-row items-center justify-end gap-3">
              <button
                onClick={() => {
                  updateFields();
                }}
                className="h-8 w-20 flex items-center justify-center text-white font-semibold bg-green-600 hover:bg-green-700 rounded-lg"
              >
                {loadingSave ? (
                  <LoadingIcon style={{ height: "18px" }} />
                ) : (
                  "Save"
                )}
              </button>
              <Link
                href={"/"}
                className="px-5 py-1 text-white font-semibold rounded-lg bg-red-500 hover:bg-red-600"
              >
                Close
              </Link>
            </div>
          </div>

          <span className="text-sm text-gray-500">{form.description}</span>

          <div className="mt-3 flex flex-col gap-3 divide-y divide-gray-300">
            <Draggable
              onPosChange={(currentPos, newPos) => {
                var element = fields[currentPos];
                let tempFields = fields;
                tempFields.splice(currentPos, 1);
                tempFields.splice(newPos, 0, element);

                setTimeout(() => {
                  setFields(tempFields);
                }, 100);
              }}
            >
              {fields?.map((field, fieldIndex) => (
                <div
                  key={fieldIndex}
                  className="flex flex-row items-start gap-3"
                >
                  <span className="mt-11 font-semibold text-gray-700">
                    {fieldIndex + 1}.
                  </span>
                  <EditField
                    warning={{
                      label: "",
                      kind: "",
                      options: "",
                    }}
                    key={fieldIndex}
                    field={field}
                    setField={(value) => {
                      setFields(
                        fields?.map((f) => {
                          if (f.id === field.id) return value;
                          else return f;
                        })
                      );
                    }}
                    deleteField={() => {
                      deleteFieldapi(field.id);
                    }}
                  />
                </div>
              ))}
            </Draggable>
          </div>
          <div className="mt-3 w-full flex flex-col items-start gap-1">
            <div className="w-full flex flex-row items-end justify-between gap-3 border-b-2 border-gray-300 pb-1">
              <label className="font-semibold text-lg">Add new field</label>
              <button
                onClick={createField}
                className="px-4 py-1.5 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-lg"
              >
                Add Field
              </button>
            </div>
            <EditField
              warning={warning}
              field={newField}
              setField={setNewField}
              deleteField={null}
            />
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
