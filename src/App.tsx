import Header from "./components/Header/Header";
import MoviesSection from "./components/MoviesSection/index";
import useAppState from "./state/state";

function App() {
  const { state, dispatch } = useAppState();

  return (
    <>
      <Header appState={state} appDispatch={dispatch} />
      <MoviesSection appState={state} appDispatch={dispatch} />
    </>
  );
}

export default App;
