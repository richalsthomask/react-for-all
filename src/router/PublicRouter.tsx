import { Redirect, useRoutes } from "raviger";

import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import FormAnswersSaved from "../components/pages/FormAnswersSaved";
import React, { Suspense } from "react";
import LoadingScreen from "../components/common/LoadingScreen";

const FormListPreview = React.lazy(
  () => import("../components/pages/FormListPreview")
);
const Form = React.lazy(() => import("../components/pages/Form"));

const publicRoutes = {
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/preview": () => (
    <Suspense fallback={<LoadingScreen />}>
      <FormListPreview />
    </Suspense>
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Suspense fallback={<LoadingScreen />}>
      <Form formId={parseFloat(formId)} />
    </Suspense>
  ),

  "/search/:search": ({ search }: { search: string }) => (
    <Suspense fallback={<LoadingScreen />}>
      <FormListPreview searchString={search} />
    </Suspense>
  ),
  "/submitted": () => <FormAnswersSaved />,
};

export default function PublicRouter() {
  let route = useRoutes(publicRoutes);
  return route || <Redirect to="/preview" replace={true} />;
}
