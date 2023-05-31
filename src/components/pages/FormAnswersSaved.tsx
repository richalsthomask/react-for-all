import { Link } from "raviger";

export default function FormAnswersSaved() {
  return (
    <div className="py-7 flex-grow w-full bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto px-6 pt-12 pb-10 rounded-lg bg-white shadow-lg flex flex-col gap-1 items-center">
        <span className="mb-5 text-gray-500">
          Your Answers are Saved. Thank you for your time
        </span>
        <button className="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg">
          <Link href="/preview">Go Back</Link>
        </button>
      </div>
    </div>
  );
}
