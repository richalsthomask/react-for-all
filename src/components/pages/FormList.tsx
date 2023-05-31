import { useCallback, useEffect, useState } from "react";
import { Link } from "raviger";

import { getForms } from "../common/api";
import CreateFormPopup from "../common/CreateFormPopup";
import useUserAction from "../actions/userActions";
import { FormResponse } from "../interfaces/apiResponses";
import DeleteFormPopup from "../common/DeleteFormPopup";
import Paginator from "../common/Paginater";
import { toast } from "react-toastify";

export default function FormList({
  searchString = "",
}: {
  searchString: string;
}) {
  const [forms, setForms] = useState([]);
  const [page, setPage] = useState({
    limit: 8,
    offset: 0,
    total: 0,
    previous: null,
    next: null,
  });
  const [loading, setLoading] = useState(false);
  const [createFormPopup, setCreateFormPopup] = useState(false);
  const [deleteForm, setDeleteForm] = useState({
    id: 0,
    title: "",
    show: false,
  });
  const { logout } = useUserAction();

  const fetchForms = useCallback(() => {
    setLoading(true);
    getForms({ offset: page.offset, limit: page.limit })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setForms(res.results);
        setPage((page) => {
          return {
            ...page,
            total: res.count,
            previous: res.previous,
            next: res.next,
          };
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
        if (error?.detail === "Invalid token.") logout();
        toast.error(error?.message ?? "Error Occured During Network Call");
      });
  }, [page.limit, page.offset, logout]);

  useEffect(() => {
    fetchForms();
  }, [page.offset, fetchForms]);

  return (
    <div className="flex-grow w-full bg-gray-100">
      {searchString && (
        <div className="px-6 text-2xl font-bold text-gray-400 italic">
          Search result for "{searchString}"
        </div>
      )}
      {loading ? (
        <div className="w-full py-20 flex items-center justify-center text-gray-400 font-semibold text-sm">
          Loading...
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-8 flex flex-col gap-20">
          <div className="w-full flex flex-row items-center flex-wrap gap-4">
            {forms?.length === 0 && (
              <div className="w-full py-20 flex items-center justify-center text-gray-400 font-semibold text-sm">
                No forms found
              </div>
            )}
            <div className="mt-10 flex flex-row items-center justify-center flex-wrap gap-5 w-full h-full">
              {forms
                ?.filter((val: FormResponse) => {
                  console.log(val.title, searchString);
                  return searchString ? val.title.includes(searchString) : true;
                })
                .map((form: FormResponse, formIndex) => (
                  <div
                    key={formIndex}
                    className="w-60 sm:w-80 h-40 bg-white rounded shadow-lg px-5 py-4 flex flex-col justify-center gap-2"
                  >
                    <div className="flex-grow flex flex-col gap-1">
                      <label className="pt-4 w-full text-lg font-semibold truncate">
                        {form.title}
                      </label>
                      <label className="w-full text-sm text-gray-500 truncate">
                        {form.description}
                      </label>
                    </div>

                    <div className="w-full flex flex-row items-center justify-end gap-2">
                      <Link
                        href={"/preview/" + form.id}
                        className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                      >
                        Open
                      </Link>
                      <Link
                        href={"/form/" + form.id}
                        className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteForm({
                            id: form.id,
                            title: form.title,
                            show: true,
                          });
                        }}
                        className="px-4 py-2 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              <div className="w-60 sm:w-80 h-40 bg-white rounded shadow-lg px-5 py-4 flex flex-col justify-center gap-2">
                <label className="pt-4 w-full flex-grow text-lg font-semibold truncate">
                  Create new form
                </label>

                <div className="w-full flex flex-row items-center justify-end gap-2">
                  <button
                    className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                    onClick={() => {
                      setCreateFormPopup(true);
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Paginator
            limit={page.limit}
            offset={page.offset}
            total={page.total}
            previous={page.previous}
            next={page.next}
            setPage={(nextPage: number) =>
              setPage((page) => {
                return { ...page, offset: nextPage };
              })
            }
          />
        </div>
      )}
      <CreateFormPopup
        isOpen={createFormPopup}
        onClose={() => {
          setCreateFormPopup(false);
          fetchForms();
        }}
      />
      <DeleteFormPopup
        formName={deleteForm.title}
        formId={deleteForm.id}
        isOpen={deleteForm.show}
        closePopup={() => {
          fetchForms();
          setDeleteForm({
            id: 0,
            title: "",
            show: false,
          });
        }}
      />
    </div>
  );
}
