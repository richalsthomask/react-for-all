import { useRoutes } from "raviger";

import FormList from "../components/pages/FormList";
import FormEdit from "../components/pages/FormEdit";
import FormListPreview from "../components/pages/FormListPreview";
import Form from "../components/pages/Form";
import FormAnswersSaved from "../components/pages/FormAnswersSaved";

const privateRoutes = {
  "/": () => <FormList searchString="" />,
  "/form/:formId": ({ formId }: { formId: string }) => (
    <FormEdit formId={parseFloat(formId)} />
  ),
  "/preview": () => <FormListPreview />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Form formId={parseFloat(formId)} />
  ),
  "/search/:search": ({ search }: { search: string }) => (
    <FormList searchString={search} />
  ),
  "/submitted": () => <FormAnswersSaved />,
};

export default function PrivateRouter() {
  let route = useRoutes(privateRoutes);
  return (
    route || (
      <div className="w-full h-full py-20 flex items-center justify-center">
        <h1 className="text-sm font-semibold text-gray-500">No Page Found</h1>
      </div>
    )
  );
}
