import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import { QueryClient, QueryClientProvider } from "react-query";
import ProjectEdit from "./pages/project";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-bs-theme="custom">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="projects" index element={ <Home/> } />
              <Route path="projects/project/:id" element={<ProjectEdit />} />
              <Route path="users" element={ <Users/> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
    
  );
}

export default App;
