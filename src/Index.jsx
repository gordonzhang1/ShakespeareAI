import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import App from "./components/App";

export default function Index() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<App />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
