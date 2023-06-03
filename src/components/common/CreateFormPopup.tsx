import { useEffect, useRef, useState } from "react";

import { postForm } from "./api";
import useUserAction from "../actions/userActions";

export default function CreateFormPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [warning, setWarning] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { handleError } = useUserAction();
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current.focus();
    }
  }, []);

  const createForm = () => {
    setLoading(true);
    postForm({
      title: formName,
      description: formDescription,
    })
      .then(() => {
        setLoading(false);
        setWarning({
          title: "",
          description: "",
        });
        setFormName("");
        setFormDescription("");
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        setWarning({
          title: err.title ? err.title[0] : "",
          description: err.description ? err.description[0] : "",
        });
        handleError(err);
      });
  };

  return (
    <div
      onClick={() => {
        onClose();
      }}
      className={`${
        isOpen ? "fixed" : "hidden"
      } w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full max-w-md bg-white rounded-md shadow"
      >
        {loading ? (
          <div className="w-full flex flex-col items-center justify-center gap-8 px-8 pt-10 pb-8">
            <h1 className="text-2xl font-semibold text-gray-700">
              Create New Form
            </h1>
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-8 px-8 pt-10 pb-8">
            <h1 className="text-2xl font-semibold text-gray-700">
              Create New Form
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createForm();
              }}
              className="w-full flex flex-col"
            >
              <div className="w-full flex flex-row gap-3 justify-between items-center">
                <label className="text-sm text-gray-600">Form Name</label>
                <span className="text-xs text-red-500">{warning.title}</span>
              </div>
              <input
                ref={firstRef}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-gray-200"
                placeholder="Form Name"
              />
              <div className="mt-3 w-full flex flex-row gap-3 justify-between items-center">
                <label className="text-sm text-gray-600">
                  Form Description
                </label>
                <span className="text-xs text-red-500">
                  {warning.description}
                </span>
              </div>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md border border-gray-200"
                placeholder="Form Description"
              />
              <div className="mt-7 w-full flex flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setWarning({
                      title: "",
                      description: "",
                    });
                    setFormName("");
                    setFormDescription("");
                    onClose();
                  }}
                  className="px-6 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onBlur={() => {
                    firstRef?.current?.focus();
                  }}
                  className="px-6 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
