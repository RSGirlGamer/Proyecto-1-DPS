import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div data-bs-theme="custom">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={ <Home/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
