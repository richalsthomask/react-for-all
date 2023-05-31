import { Link } from "raviger";
import { useState } from "react";
import useUserAction from "../actions/userActions";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [warning, setWarning] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { registerUser } = useUserAction();

  const userRegister = async () => {
    if (
      !userData.username ||
      !userData.password ||
      !userData.email ||
      !userData.confirmPassword
    ) {
      setWarning({
        username: !userData.username ? "Username is required" : "",
        password:
          !userData.password || !userData.confirmPassword
            ? "Password is required"
            : "",
        email: !userData.email ? "Email is required" : "",
      });
      return;
    }
    setLoading(true);
    const { username, email, password, confirmPassword } = userData;
    setLoading(
      await registerUser({ username, email, password, confirmPassword })
    );
  };

  return (
    <div className="w-full flex-grow bg-gray-100 h-full py-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-md shadow">
        <div className="w-full flex flex-col items-center justify-center gap-8 px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-700">Register</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              userRegister();
            }}
            className="w-full flex flex-col"
          >
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <label className="text-sm text-gray-600">User Name</label>
              <span className="text-xs text-red-500">{warning.username}</span>
            </div>
            <input
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              className="w-full px-3 py-1.5 rounded-md border border-gray-200"
              placeholder="User Name"
            />
            <div className="mt-3 w-full flex flex-row gap-3 justify-between items-center">
              <label className="text-sm text-gray-600">Email</label>
              <span className="text-xs text-red-500">{warning.email}</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full px-3 py-1.5 rounded-md border border-gray-200"
            />
            <div className="mt-3 w-full flex flex-row gap-3 justify-between items-center">
              <label className="text-sm text-gray-600">Password</label>
              <span className="text-xs text-red-500">{warning.password}</span>
            </div>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="w-full px-3 py-1.5 rounded-md border border-gray-200"
              placeholder="Password"
            />
            <div className="mt-3 w-full flex flex-row gap-3 justify-between items-center">
              <label className="text-sm text-gray-600">Confirm Password</label>
              <span className="text-xs text-red-500">{warning.password}</span>
            </div>
            <input
              type="password"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
              className="w-full px-3 py-1.5 rounded-md border border-gray-200"
              placeholder="Confirm Password"
            />
            <button
              disabled={loading}
              type="submit"
              className="mt-7 w-full px-3 py-1.5 text-white font-semibold bg-indigo-500 hover:bg-indigo-600 rounded-md"
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="text-sm text-gray-600">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="text-sm text-indigo-500 hover:text-indigo-600"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
