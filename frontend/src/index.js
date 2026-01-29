import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store, persistor } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./styles/global.css";
import "./styles/theme.css";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider>
            <App />
          </ConfigProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);