import { NavLink } from 'react-router-dom';
import style from './style.module.css';

export function NavBar() {
  return (
    <nav className={style.nav} id="nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${style.navLink}, ${isActive ? style.active : style.pending}`
        }
      >
        home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${style.navLink}, ${isActive ? style.active : style.pending}`
        }
      >
        about us
      </NavLink>
    </nav>
  );
}
