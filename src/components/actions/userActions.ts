import { useRecoilState, useSetRecoilState } from "recoil";

import { userAtom } from "../../store/userAtom";
import { navigate } from "raviger";
import { login, register } from "../common/api";
import { LoginResponse } from "../interfaces/apiResponses";
import { toast } from "react-toastify";

export default function useUserAction() {
  const setUser = useSetRecoilState(userAtom);
  const [user] = useRecoilState(userAtom);

  const handleError = (error: undefined | { message: string }) => {
    toast.error(error?.message ?? "Error Occured During Network Call");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setUser({ status: "loggedOut" });
    navigate("/preview");
  };

  const checkUser = () => {
    if (localStorage.getItem("accessToken")) {
      setUser({
        status: "loggedIn",
        username: localStorage.getItem("username") || "",
        token: localStorage.getItem("accessToken") || "",
      });
      navigate("/");
    } else logout();
  };

  const loginUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return login({ username, password })
      .then((res: LoginResponse) => {
        console.log({ res });
        if (res?.token) {
          localStorage.setItem("accessToken", res.token);
          localStorage.setItem("username", username);
          setUser({
            status: "loggedIn",
            username: username,
            token: res.token,
          });
          navigate("/");
        }
        return false;
      })
      .catch((res) => {
        handleError(res);
        return false;
      });
  };

  const registerUser = async ({
    username,
    email,
    password,
    confirmPassword,
  }: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return register({ username, email, password, confirmPassword })
      .then((res: LoginResponse) => {
        console.log({ res });
        navigate("/login");
        return false;
      })
      .catch((res) => {
        handleError(res);
        return false;
      });
  };

  return { checkUser, logout, loginUser, registerUser, handleError };
}
