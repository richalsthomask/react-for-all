import { useRecoilState } from "recoil";
import { useEffect } from "react";

import BaseWrapper from "../components/common/BaseWrapper";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { userAtom } from "../store/userAtom";
import useUserAction from "../components/actions/userActions";

export default function Router() {
  const [user] = useRecoilState(userAtom);
  const { checkUser } = useUserAction();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <BaseWrapper>
      {user.status === "loggedIn" ? <PrivateRouter /> : <PublicRouter />}
    </BaseWrapper>
  );
}
