import { atom } from "recoil";

export interface UserLoggedOut {
  status: "loggedOut";
}

export interface UserLoggedIn {
  status: "loggedIn";
  username: string;
  token: string;
}

export type userState = UserLoggedOut | UserLoggedIn;

export const userAtom = atom<userState>({
  key: "userAtom",
  default: { status: "loggedOut" },
});
