import "./App.css";
import Home from "./components/Home.jsx";
import Store from "./contexts/Contexts.jsx";

function App() {
  return (
    <Store>
      <Home />
    </Store>
  );
}

export default App;
