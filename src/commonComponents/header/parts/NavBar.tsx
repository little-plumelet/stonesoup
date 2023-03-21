import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <nav>
      <NavLink to="/home">home</NavLink>
      <NavLink to="/about">about us</NavLink>
    </nav>
  );
}
