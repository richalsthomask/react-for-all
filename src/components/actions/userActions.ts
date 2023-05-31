import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

import { userAtom } from "../../store/userAtom";
import { navigate } from "raviger";
import { login } from "../common/api";
import { LoginResponse } from "../interfaces/apiResponses";
import { useCallback } from "react";

export default function useUserAction() {
  const setUser = useSetRecoilState(userAtom);

  const handleError = (
    error: undefined | { message: string; detail: string | undefined }
  ) => {
    console.log("error handle", error);
    if (error?.detail === "Invalid token.") logout();
    toast.error(error?.message ?? "Error Occured During Network Call");
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setUser({ status: "loggedOut" });
    navigate("/preview");
  }, [setUser]);

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

  return { checkUser, logout, loginUser, handleError };
}
