import LayoutPage from "./pages/LayoutPage";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import Main from "./components/Main";
import { MovieProvider } from "./contexts/MovieContext";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <>
      <BrowserRouter>
        <MovieProvider>
          <Routes>
            <Route element={<LayoutPage />}>
              <Route path="/" element={<Main />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
