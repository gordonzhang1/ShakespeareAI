import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import App from "./components/App";
import Signup from "./components/Signup";
import { AuthProvider } from "../server/authcontext";

export default function Index() {
  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<App />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}
