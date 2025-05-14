import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import useSSE from "@hooks/useSSE";
import Loading from "@components/Loading";
import { toast, ToastContainer } from "react-toastify";

import "./App.css";

function App() {
  const { SSECompleted, SSETestData, SSETest2Data } = useSSE();
  console.log("SSECompleted", SSECompleted);
  console.log("SSETestData", SSETestData);
  console.log("SSETest2Data", SSETest2Data);

  useEffect(() => {
    if (SSETestData?.data) {
      toast(`${SSETestData?.data}`);
    }
  }, [SSETestData]);
  useEffect(() => {
    if (SSETest2Data?.data) {
      toast(`${SSETest2Data?.data}`);
    }
  }, [SSETest2Data]);
  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer
        position="top-right"
        limit={2}
        closeButton={true}
        autoClose={4000}
      />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
