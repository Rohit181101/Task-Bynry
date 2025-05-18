import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Profile Explorer</Link>
        <div className="space-x-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'underline font-semibold' : ''}>Home</NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'underline font-semibold' : ''}>Admin</NavLink>
          <NavLink to="/profile/1" className={({ isActive }) => isActive ? 'underline font-semibold' : ''}>Sample Profile</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
