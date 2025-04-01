import { GlobalProvider } from "./contexts/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // router
import DefaultLayout from "./layouts/DefaultLayout"; // layouts
import Homepage from "./pages/Homepage"; // pages
import ProductPage from "./pages/ProductPage"; //product

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Homepage}></Route>
            <Route path="/slug" Component={ProductPage}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
