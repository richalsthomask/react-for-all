import { RecoilRoot } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./router/Router";

export default function App() {
  return (
    <RecoilRoot>
      <Router />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </RecoilRoot>
  );
}
