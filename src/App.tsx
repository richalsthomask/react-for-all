import { useRoutes } from "raviger";
import BaseWrapper from "./components/common/BaseWrapper";
import FormList from "./components/pages/FormList";
import Form from "./components/pages/Form";
import FormEdit from "./components/pages/FormEdit";
import FormListPreview from "./components/pages/FormListPreview";

const routes = {
  "/": () => <FormList searchString="" />,
  "/preview": () => <FormListPreview />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Form formId={parseFloat(formId)} />
  ),
  "/:search": ({ search }: { search: string }) => (
    <FormList searchString={search} />
  ),
  "/form/:formId": ({ formId }: { formId: string }) => (
    <FormEdit formId={parseFloat(formId)} />
  ),
};

export default function App() {
  let route = useRoutes(routes);
  return <BaseWrapper>{route}</BaseWrapper>;
}
