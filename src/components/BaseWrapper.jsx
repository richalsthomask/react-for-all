import { Link, navigate } from "raviger";
import { useState } from "react";

export default function BaseWrapper({ children }) {
  const [searchString, setSearchString] = useState("");

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="w-full bg-gray-700 px-4 py-6">
        <div className="text-white mx-auto max-w-6xl flex flex-row justify-between items-center gap-8">
          <div className="flex flex-row items-center gap-8">
            <Link href="/">Home</Link>
            <Link href="/preview">Preview</Link>
          </div>
          <div className="flex flex-row gap-3">
            <input
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="bg-gray-600 border-b-2 px-2 border-gray-400 focus:border-gray-600 outline-none focus:outline-none"
              onKeyDown={(key) => {
                if (key.key === "Enter") {
                  setSearchString("");
                  navigate("/" + searchString);
                }
              }}
            />
            <button
              onClick={() => {
                setSearchString("");
                navigate("/" + searchString);
              }}
              className="px-4 py-1 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
