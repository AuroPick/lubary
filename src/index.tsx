import { registerRootComponent } from "expo";
import React from "react";
import { App } from "./App";
import { ContextProvider } from "./context";

export function index() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

export default registerRootComponent(index);
