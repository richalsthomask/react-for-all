import { useEffect, useRef, useState } from "react";
import { deleteForm } from "./api";
import useUserAction from "../actions/userActions";

export default function DeleteForm({
  formName,
  formId,
  isOpen,
  closePopup,
}: {
  formName: string;
  formId: number;
  isOpen: boolean;
  closePopup: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { handleError } = useUserAction();
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current.focus();
    }
  }, []);

  const deleteFormApi = () => {
    setLoading(true);
    deleteForm({ id: formId })
      .then(() => {
        setLoading(false);
        closePopup();
      })
      .catch((err) => {
        console.log({ err });
        if (err?.message === "Unexpected end of JSON input") {
          setLoading(false);
          closePopup();
        }
        setLoading(false);
        handleError(err);
      });
  };
  return (
    <div
      onClick={() => {
        closePopup();
      }}
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {loading ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded-lg p-8"
          >
            <div className="text-2xl font-semibold mb-4">Delete Form</div>
            <div className="text-lg mb-4">Deleting form {formName}...</div>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded-lg p-8"
          >
            <div className="text-2xl font-semibold mb-4">Delete Form</div>
            <div className="text-lg mb-4">
              Are you sure you want to delete form {formName}?
            </div>
            <div className="w-full flex flex-row justify-end gap-2">
              <button
                ref={firstRef}
                onClick={() => {
                  deleteFormApi();
                }}
                className="px-6 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  closePopup();
                }}
                onBlur={() => {
                  firstRef?.current?.focus();
                }}
                className="px-6 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
