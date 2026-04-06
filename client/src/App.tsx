import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";

// Protected route - redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Placeholder for pages not yet built
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-gray-400">
    <span className="text-5xl mb-4">🚧</span>
    <p className="text-xl font-semibold text-primary-100">{title}</p>
    <p className="text-sm mt-2">בקרוב...</p>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/children"
        element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="ניהול ילדים" />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/finance"
        element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="כספים ותשלומים" />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="ניהול עובדים" />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/insights"
        element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="תובנות AI" />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
