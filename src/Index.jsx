import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import App from "./components/App";
import SignupOld from "./components/SignupOld";
import { AuthProvider } from "../server/authcontext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import FrontPage from "./components/FrontPage";
import SigninNew from "./components/SigninNew";
import SignUpNew from "./components/SignUpNew";

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
              <Route
                path="/update-profile"
                element={<PrivateRoute element={<UpdateProfile />} />}
              />
              <Route index element={<FrontPage />} />
              <Route path="/home" element={<App />} />
              <Route path="/sign-up" element={<SignUpNew />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<FrontPage />} />
              <Route path="/sign-in" element={<SigninNew />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}
