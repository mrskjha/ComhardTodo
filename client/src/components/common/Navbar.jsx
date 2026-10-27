import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-blue-600">Comhard Todo</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hi, {user?.name}</span>
        <button onClick={logout} className="text-red-500 font-semibold">Logout</button>
      </div>
    </nav>
  );
}