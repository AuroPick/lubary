import { registerRootComponent } from "expo";
import React from "react";
import { App } from "./App";
import { LanguageContextProvider, ThemeContextProvider } from "./contexts";

export function index() {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <App />
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}

export default registerRootComponent(index);
