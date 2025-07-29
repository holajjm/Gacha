import React, { Suspense } from "react";

function WithSuspense(Component: React.ReactNode) {
  return <Suspense fallback={<>Loading...</>}>{Component}</Suspense>;
}

export default WithSuspense;
