import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded ${isActive ? 'bg-white text-black' : 'text-white hover:bg-neutral-800'}`;

  return (
    <div className="min-h-screen flex bg-neutral-950">
      <aside className="w-56 bg-neutral-900 p-4 flex flex-col">
        <h2 className="text-white font-bold text-lg mb-6">Broken Diary</h2>
        <nav className="flex flex-col gap-1 flex-1">
          <NavLink to="/admin/tempat" className={linkClass}>Place</NavLink>
          <NavLink to="/admin/makanan" className={linkClass}>Food</NavLink>
        </nav>
        <button onClick={handleLogout} className="text-red-400 text-sm text-left px-4 py-2 hover:bg-neutral-800 rounded">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}