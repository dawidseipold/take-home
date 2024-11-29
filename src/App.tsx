import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/Entrypoint";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex w-full min-h-dvh justify-center">
        <Entrypoint />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
