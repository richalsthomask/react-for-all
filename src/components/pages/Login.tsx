import { Link } from "raviger";
import { useState } from "react";

import useUserAction from "../actions/userActions";

export default function Login() {
  const { loginUser } = useUserAction();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const userLogin = async () => {
    if (!username || !password) {
      setWarning({
        username: !username ? "Username is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }
    setLoading(true);
    setLoading(await loginUser({ username, password }));
  };
  return (
    <div className="w-full flex-grow bg-gray-100 h-full py-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-md shadow">
        <div className="w-full flex flex-col items-center justify-center gap-8 px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-700">Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              userLogin();
            }}
            className="w-full flex flex-col"
          >
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <label className="text-sm text-gray-600">User Name</label>
              <span className="text-xs text-red-500">{warning.username}</span>
            </div>

            <input
              className="w-full px-3 py-1.5 rounded-md border border-gray-200"
              placeholder="User Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <label className="mt-3 text-sm text-gray-600">Password</label>
              <span className="text-xs text-red-500">{warning.password}</span>
            </div>
            <input
              type="password"
              className="w-full px-3 py-1.5 rounded-md border border-gray-200"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              type="submit"
              className="mt-7 w-full px-3 py-1.5 text-white font-semibold bg-indigo-500 hover:bg-indigo-600 rounded-md"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <div className="flex flex-row items-center justify-center gap-1">
              <span className="text-xs text-gray-600">
                Don't have an account?
              </span>
              <Link
                href="/register"
                className="text-sm text-indigo-500 hover:text-indigo-600"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
