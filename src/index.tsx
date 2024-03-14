/* eslint-disable perfectionist/sort-imports */
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";

import { store } from "@store/store";

import ModalsProvider from "@components/layout/ModalsProvider";

import { App } from "./App";
import { theme } from "./theme";

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <ModalsProvider>
          <App />
          <ToastContainer theme="colored" />
        </ModalsProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  </Provider>
);
