import "../App.css";
import Draw from "./Draw";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="draw-page-container">
        <div className="canvas-con">
          <Draw />
        </div>
      </div>
    </>
  );
}

export default App;
