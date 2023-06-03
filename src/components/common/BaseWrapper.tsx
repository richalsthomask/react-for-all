import { Link, navigate } from "raviger";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { userAtom } from "../../store/userAtom";
import useUserAction from "../actions/userActions";

export default function BaseWrapper({ children }: { children: JSX.Element }) {
  const [user] = useRecoilState(userAtom);
  const { logout } = useUserAction();
  const [searchString, setSearchString] = useState("");
  const [logoutPopup, setLogoutPopup] = useState(false);
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstRef.current && logoutPopup) {
      firstRef.current.focus();
    }
  }, [logoutPopup]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="w-full bg-gray-700 px-4 py-6">
        <div className="text-white mx-auto max-w-6xl flex flex-row justify-between items-center gap-8">
          <div className="flex flex-row items-center gap-8">
            {user.status === "loggedIn" && (
              <div className="text-white hover:text-gray-300 transform hover:scale-105 duration-300">
                <Link href="/">Home</Link>
              </div>
            )}
            <div className="text-white hover:text-gray-300 transform hover:scale-105 duration-300">
              <Link href="/preview">Preview</Link>
            </div>
          </div>
          <div className="flex flex-row items-center gap-9">
            {user.status === "loggedIn" ? (
              <button
                onClick={() => {
                  setLogoutPopup(true);
                }}
                className="text-white hover:text-gray-300 transform hover:scale-105 duration-300"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-row gap-7">
                <button className="text-white hover:text-gray-300 transform hover:scale-105 duration-300">
                  <Link href="/login">Login</Link>
                </button>
                <button className="text-white hover:text-gray-300 transform hover:scale-105 duration-300">
                  <Link href="/register">Register</Link>
                </button>
              </div>
            )}

            <div className="flex flex-row">
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="bg-gray-600 px-2 py-1 outline-none focus:outline-none rounded-l-lg"
                onKeyDown={(key) => {
                  if (key.key === "Enter") {
                    setSearchString("");
                    navigate("/search/" + searchString);
                  }
                }}
              />
              <button
                onClick={() => {
                  setSearchString("");
                  navigate("/search/" + searchString);
                }}
                className="px-4 py-1 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-r-lg"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
      {logoutPopup && (
        <div
          onClick={() => {
            setLogoutPopup(false);
          }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white rounded-lg p-8"
          >
            <div className="text-2xl font-semibold mb-4">Logout</div>
            <div className="text-lg mb-4">Are you sure you want to logout?</div>
            <div className="w-full flex flex-row justify-end gap-2">
              <button
                ref={firstRef}
                onClick={() => {
                  logout();
                  setLogoutPopup(false);
                }}
                className="px-6 py-1.5 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setLogoutPopup(false);
                }}
                onBlur={() => {
                  firstRef?.current?.focus();
                }}
                className="px-6 py-1.5 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
