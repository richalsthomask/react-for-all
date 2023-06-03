export default function Paginator({
  limit,
  offset,
  total,
  previous,
  next,
  setPage,
}: {
  limit: number;
  offset: number;
  total: number;
  previous: string | null;
  next: string | null;
  setPage: (nextPage: number) => void;
}) {
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => {
            setPage(offset - limit);
          }}
          disabled={!previous}
          className={
            "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 " +
            (previous ? "" : "opacity-50")
          }
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage(offset + limit);
          }}
          disabled={!next}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium"> {offset + 1} </span>
            to
            <span className="font-medium">
              {" "}
              {Math.min((offset + 1) * limit, total)}{" "}
            </span>
            of
            <span className="font-medium"> {total} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => {
                setPage(offset - limit);
              }}
              disabled={!previous}
              className={
                "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 " +
                (previous ? "" : "opacity-50")
              }
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {[...Array(Math.ceil(total / limit))].map((_, page) => (
              <button
                key={page}
                onClick={() => {
                  setPage(page * limit);
                }}
                disabled={page === offset / limit}
                className={
                  "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " +
                  (page === offset / limit
                    ? "bg-indigo-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50")
                }
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={() => {
                setPage(offset + limit);
              }}
              disabled={!next}
              className={
                "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 " +
                (next ? "" : "opacity-50")
              }
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
