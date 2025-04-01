import { GlobalProvider } from "./contexts/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // router
import DefaultLayout from "./layouts/DefaultLayout"; // layouts
import Homepage from "./pages/Homepage"; // pages
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    // <GlobalProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route Component={DefaultLayout}>
    //         <Route path="/" Component={Homepage}></Route>
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </GlobalProvider>
    <ProductPage/>
  );
}

export default App;
