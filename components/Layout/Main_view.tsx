import React from "react";

import Product from "../Window/Product";
import { useRouter } from "next/router";
import Dashboard from "../Window/Dashboard";
export const Main_view = () => {
  const router = useRouter();

  return (
    <>
      <Dashboard />
    </>
  );
};
