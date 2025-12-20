import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProtectedLayout from "./layouts/UserProtectedLayout";
import Pay from "./pages/Pay";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <div className="overflow-x-hidden max-w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <UserProtectedLayout>
              <Dashboard />
            </UserProtectedLayout>
          }
        />
        <Route
          path="/pay/:id"
          element={
            <UserProtectedLayout>
              <Pay />
            </UserProtectedLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <UserProtectedLayout>
              <Transactions />
            </UserProtectedLayout>
          }
        />
        <Route
          path="/transactions/:id"
          element={
            <UserProtectedLayout>
              <Transactions />
            </UserProtectedLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
