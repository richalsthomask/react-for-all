import { useRoutes } from "raviger";
import React, { Suspense } from "react";

import FormAnswersSaved from "../components/pages/FormAnswersSaved";
import LoadingScreen from "../components/common/LoadingScreen";

const Form = React.lazy(() => import("../components/pages/Form"));
const FormEdit = React.lazy(() => import("../components/pages/FormEdit"));
const FormList = React.lazy(() => import("../components/pages/FormList"));
const FormListPreview = React.lazy(
  () => import("../components/pages/FormListPreview")
);

const privateRoutes = {
  "/": () => (
    <Suspense fallback={<LoadingScreen />}>
      <FormList searchString="" />
    </Suspense>
  ),
  "/form/:formId": ({ formId }: { formId: string }) => (
    <Suspense fallback={<LoadingScreen />}>
      <FormEdit formId={parseFloat(formId)} />
    </Suspense>
  ),
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
      <FormList searchString={search} />
    </Suspense>
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
