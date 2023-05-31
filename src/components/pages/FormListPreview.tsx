import { Link } from "raviger";

import { useCallback, useEffect, useState } from "react";
import useUserAction from "../actions/userActions";
import { getForms } from "../common/api";
import { FormResponse } from "../interfaces/apiResponses";
import Paginator from "../common/Paginater";

export default function FormListPreview({
  searchString,
}: {
  searchString?: string;
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
  const { handleError } = useUserAction();

  const fetchForms = useCallback(() => {
    setLoading(true);
    getForms(page)
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
      .catch((err) => {
        setLoading(false);
        handleError(err);
      });
  }, [page, handleError]);

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
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-8 flex flex-row items-center flex-wrap gap-4">
        {loading ? (
          <div className="w-full py-20 flex items-center justify-center text-gray-400 font-semibold text-sm">
            Loading...
          </div>
        ) : forms?.length === 0 ? (
          <div className="w-full py-20 flex items-center justify-center text-gray-400 font-semibold text-sm">
            No forms found
          </div>
        ) : (
          <div className="w-full flex flex-col items-start gap-20">
            <div className="mt-10 flex flex-row items-center justify-start flex-wrap gap-5 w-full h-full">
              {forms
                ?.filter((val: FormResponse) => {
                  console.log(val.title, searchString);
                  return searchString ? val.title.includes(searchString) : true;
                })
                ?.map((form: FormResponse, formIndex) => (
                  <div
                    key={formIndex}
                    className="w-60 sm:w-80 h-40 bg-white rounded shadow-lg px-5 py-4 flex flex-col justify-center gap-2"
                  >
                    <label className="pt-4 w-full flex-grow text-lg font-semibold truncate">
                      {form.title}
                    </label>

                    <div className="w-full flex flex-row items-center justify-end gap-2">
                      <Link
                        href={"/preview/" + form.id}
                        className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                ))}
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
      </div>
    </div>
  );
}
