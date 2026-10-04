import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/admin/Login';
import TempatAdmin from './pages/admin/TempatAdmin';
import MakananAdmin from './pages/admin/MakananAdmin';
import Home from './pages/Home';
import { PlacePage } from './pages/PlacePage';
import { FoodPage } from './pages/FoodPage';
import { RandomPage } from './pages/RandomPage';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* PUBLIK */}
          <Route path="/" element={<Home />} />
          <Route path="/place" element={<PlacePage />} />
          <Route path="/places" element={<PlacePage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/random" element={<RandomPage />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="tempat" element={<TempatAdmin />} />
            <Route path="makanan" element={<MakananAdmin />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;