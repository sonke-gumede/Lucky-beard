import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import AppTheme from "./theme";
import GlobalStyle from "./theme/GlobalStyle";
import ProductPageClient from "./screen/product";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={AppTheme}>
        <GlobalStyle />
        <ProductPageClient productId="123" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
