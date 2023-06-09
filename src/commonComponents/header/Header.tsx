import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { NavBar } from './parts/navBar';
import { SearchBar } from './parts/searchBar';
import logo from '../../assets/pot_logo.png';
import { MobileNavBar } from './parts/mobileNavBar';
import { useVeiwPort } from '../../customHooks/useViewPort';
import { routes } from '../../constants-routes';
import { MOBILE_SCREEN_WIDTH_BREACKPOINT } from '../../constants';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useVeiwPort();

  const handleSearchClick = () => {
    navigate('/searchresult');
  };

  return (
    <header className={style.headerBlock}>
      <div
        className={
          location?.pathname.includes('/recipe')
            ? style.headerRecipePage
            : style.header
        }
      >
        <Link to={routes.home.path}>
          <div className={style.logoBlock}>
            <img className={style.logoImg} src={logo} alt="logo" />
            <h1 className={style.logo}>StoneSoup</h1>
            <h1 className={style.logoClone}>StoneSoup</h1>
          </div>
        </Link>
        {width >= MOBILE_SCREEN_WIDTH_BREACKPOINT &&
          !location?.pathname.includes('/recipe') && (
            <NavBar
              navStyle={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '1rem',
              }}
            />
          )}
        <Space size="middle" className={style.icons}>
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearchClick}
            data-testid="searchicon"
          />
          <Button shape="circle" icon={<UserOutlined />} />
          {(width < MOBILE_SCREEN_WIDTH_BREACKPOINT ||
            location?.pathname.includes('/recipe')) && <MobileNavBar />}
        </Space>
      </div>
      <div className={style.searchBar}>
        {location?.pathname === '/searchresult' && <SearchBar />}
      </div>
    </header>
  );
}
