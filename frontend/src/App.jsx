import { GlobalProvider } from './contexts/GlobalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // router
import DefaultLayout from './layouts/DefaultLayout'; // layouts
import Home from './components/Home'; // pages

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
