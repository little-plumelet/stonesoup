import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { routes } from '../../constants-routes';
import style from './style.module.css';

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerBlock}>
        <div className={style.logoBlock}>
          <h2 className={style.logo}>Stonesoup</h2>
          <p className={style.logoContent}>
            Indulge in culinary magic with tantalizing recipes and the
            enchanting tale of Stone Soup, where flavors blend like a fairytale
            come true.
          </p>
        </div>
        <div className={style.navBlock}>
          <nav className={style.nav}>
            <p>Stonesoup</p>
            <Link to={routes.home.path} className={style.link}>
              {routes.home.title}
            </Link>
            <Link to={routes.about.path} className={style.link}>
              {routes.about.title}
            </Link>
            <Link to={routes.contacts.path} className={style.link}>
              {routes.contacts.title}
            </Link>
          </nav>
          <nav className={style.nav}>
            <p>Follow</p>
            <a href="https://www.instagram.com" className={style.link}>
              Instagram
            </a>
            <a href="https://www.facebook.com" className={style.link}>
              Facebook
            </a>
            <a href="https://www.youtube.com" className={style.link}>
              Youtube
            </a>
          </nav>
        </div>
      </div>
      <Divider />
      <div className={style.footerBlock}>
        <p className={style.copyright}>
          &#169; Stonesoup - all rights reserved
        </p>
        <div className={style.socialNetBlock}>
          <InstagramOutlined className={style.icon} />
          <FacebookOutlined className={style.icon} />
          <YoutubeOutlined className={style.icon} />
        </div>
      </div>
    </footer>
  );
}
