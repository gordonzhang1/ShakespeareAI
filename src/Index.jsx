import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import App from "./components/App";
import Signup from "./components/Signup";
import { AuthProvider } from "../server/authcontext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";

export default function Index() {
  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<App />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}
