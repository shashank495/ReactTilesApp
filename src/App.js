import { useEffect } from "react";
import "./App.css";
import Tiles from "./Components/Tiles";

// to clear local storage data after refresh the page
function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="App">
      <Tiles />
    </div>
  );
}

export default App;
