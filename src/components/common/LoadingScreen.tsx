import { LoadingIcon } from "./svg";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingIcon className="w-12 h-12 text-blue-500" />
    </div>
  );
}
