import { NavLink } from 'react-router-dom';
import { routes } from '../../../../constants-routes';
import style from './style.module.css';

export function NavBar() {
  return (
    <nav className={style.nav} id="nav">
      <NavLink
        to={routes.home.path}
        className={({ isActive }) =>
          `${style.navLink}, ${isActive ? style.active : style.pending}`
        }
      >
        {routes.home.title}
      </NavLink>
      <NavLink
        to={routes.about.path}
        className={({ isActive }) =>
          `${style.navLink}, ${isActive ? style.active : style.pending}`
        }
      >
        {routes.about.title}
      </NavLink>
    </nav>
  );
}
