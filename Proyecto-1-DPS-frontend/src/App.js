import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import { QueryClient, QueryClientProvider } from "react-query";
import ProjectEdit from "./pages/project";
import Register from "./pages/register";
import Login from "./pages/login";
import PrivateRoute from "./components/private_route";
import AuthProvider from "./services/auth_provider";
import Roles from "./pages/roles";

const queryClient = new QueryClient()

function App() {

  
  return (
    <QueryClientProvider client={queryClient}>
      <div data-bs-theme="custom">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute/>}>
                <Route path="" index element={ <Home/> }/>
                <Route path="projects" element={ <Home/> } />
                <Route path="roles" element={ <Roles/> } />
                <Route path="projects/project/:projectID" element={<ProjectEdit />} />
                <Route path="users" element={ <Users/> } />
              </Route>
              <Route path="/">
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />}/>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
    
  );
}

export default App;
