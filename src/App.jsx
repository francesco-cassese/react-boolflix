import Header from "./components/Header";
import Main from "./components/Main";
import { MovieProvider } from "./contexts/MovieContext";

function App() {

  return (
    <>
      <MovieProvider>
        <Header />
        <Main />
      </MovieProvider>
    </>
  );
}
export default App;
