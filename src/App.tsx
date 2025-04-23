import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import Loading from "@components/Loading";

import "./App.css";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
