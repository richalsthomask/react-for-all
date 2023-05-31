import { Redirect, useRoutes } from "raviger";

import FormListPreview from "../components/pages/FormListPreview";
import Form from "../components/pages/Form";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import FormAnswersSaved from "../components/pages/FormAnswersSaved";

const publicRoutes = {
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/preview": () => <FormListPreview />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Form formId={parseFloat(formId)} />
  ),
  "/search/:search": ({ search }: { search: string }) => (
    <FormListPreview searchString={search} />
  ),
  "/submitted": () => <FormAnswersSaved />,
};

export default function PublicRouter() {
  let route = useRoutes(publicRoutes);
  return route || <Redirect to="/preview" replace={true} />;
}
