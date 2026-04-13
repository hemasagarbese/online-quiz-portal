import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

// Main Pages
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
// Quiz Pag es
import CQuiz from "./pages/CQuiz/CQuiz";
import CPlusPlusQuiz from "./pages/CPlusPlusQuiz/CPlusPlusQuiz";
import JavaQuiz from "./pages/JavaQuiz/JavaQuiz";
import JavaScriptQuiz from "./pages/JavaScriptQuiz/JavaScriptQuiz";
import PythonQuiz from "./pages/PythonQuiz/PythonQuiz";
import AlgorithmsQuiz from "./pages/AlgorithmsQuiz/AlgorithmsQuiz";
import ComputerNetworksQuiz from "./pages/ComputerNetworksQuiz/ComputerNetworksQuiz";
import CompilerDesignQuiz from "./pages/CompilerDesignQuiz/CompilerDesignQuiz";

// Layout Component
const Layout = () => (
  <div className="app-layout">
    <header
      style={{
        padding: "10px",
        background: "#0b1736",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1>🧠 Online Quiz Portal</h1>
    </header>
    <main style={{ padding: "20px", minHeight: "80vh" }}>
      <Outlet />
    </main>
    <footer
      style={{
        background: "#0b1736",
        color: "white",
        textAlign: "center",
        padding: "10px",
      }}
    >
      © 2025 Online Quiz Portal
    </footer>
  </div>
);

// 404 Page
const NotFoundPage = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h1>404 - Page Not Found</h1>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected Quiz & Result Routes */}
          <Route
            path="quiz/c"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/cplusplus"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CPlusPlusQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/cpp"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CPlusPlusQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/java"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <JavaQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/javascript"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <JavaScriptQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/python"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PythonQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/algorithms"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AlgorithmsQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/networks"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ComputerNetworksQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/compiler"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CompilerDesignQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/computer-networks"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ComputerNetworksQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="quiz/compiler-design"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CompilerDesignQuiz />
              </ProtectedRoute>
            }
          />

          {/* Result Page (also protected) */}
          <Route
            path="result"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ResultPage />
              </ProtectedRoute>
            }
          />
          {/* Dashboard page */}
         <Route
            path="dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
