import Header from "./components/Header/Header";
import MoviesSection from "./components/MoviesSection/index";
import { AppProvider } from "./hook/useAppState";

function App() {
  return (
    <AppProvider>
      <Header />
      <MoviesSection />
    </AppProvider>
  );
}

export default App;
