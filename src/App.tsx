import React, { useEffect, useState } from "react";
import { useRoutes } from "raviger";
import BaseWrapper from "./components/BaseWrapper";
import FormList from "./components/pages/FormList";
import Form from "./components/pages/Form";
import FormEdit from "./components/pages/FormEdit";

const routes = {
  "/": () => <FormList searchString="" preview={false} />,
  "/preview": () => <FormList searchString="" preview={true} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Form formId={parseFloat(formId)} />
  ),
  "/:search": ({ search }: { search: string }) => (
    <FormList searchString={search} preview={false} />
  ),
  "/form/:formId": ({ formId }: { formId: string }) => (
    <FormEdit formId={parseFloat(formId)} />
  ),
};

export default function App() {
  let route = useRoutes(routes);
  return <BaseWrapper>{route}</BaseWrapper>;
}
