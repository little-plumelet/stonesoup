import { Link } from 'react-router-dom';
import { routes } from '../../constants-routes';
import style from './style.module.css';

export const navItems = {
  title: 'Stonesoup',
  items: [
    {
      key: routes.home.title,
      label: (
        <Link to={routes.home.path} className={style.link}>
          {routes.home.title}
        </Link>
      ),
    },
    {
      key: routes.about.title,
      label: (
        <Link to={routes.about.path} className={style.link}>
          {routes.about.title}
        </Link>
      ),
    },
    {
      key: routes.contacts.title,
      label: (
        <Link to={routes.contacts.path} className={style.link}>
          {routes.contacts.title}
        </Link>
      ),
    },
  ],
};

export const networkItems = {
  title: 'Follow',
  items: [
    {
      key: 'instagram',
      label: (
        <a href="https://www.instagram.com" className={style.link}>
          Instagram
        </a>
      ),
    },
    {
      key: 'facebook',
      label: (
        <a href="https://www.facebook.com" className={style.link}>
          Facebook
        </a>
      ),
    },
    {
      key: 'youtube',
      label: (
        <a href="https://www.youtube.com" className={style.link}>
          Youtube
        </a>
      ),
    },
  ],
};
