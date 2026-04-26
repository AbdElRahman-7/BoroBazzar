
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Nav from "./shared/components/layout/Nav"
import Footer from "./shared/components/layout/Footer"
import AppRouter from "./routes/AppRouter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter> */}
        <div className="min-h-screen flex flex-col">
          <Nav />

          <main className="flex-1">
            <AppRouter />
          </main>

          <Footer />
        </div>
      {/* </BrowserRouter> */}
    </QueryClientProvider>
  );
};

export default App;