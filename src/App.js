import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-bs-theme="custom">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="proyects" index element={ <Home/> } />
              <Route path="users" element={ <Users/> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
    
  );
}

export default App;
