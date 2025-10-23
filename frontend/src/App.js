import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import routes from "./routes";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { CartProvider } from "./context/CartContext"

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  );
}
