import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { NavBar } from './parts/navBar';
import { SearchBar } from './parts/searchBar';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/searchresult');
  };

  return (
    <header className={style.header}>
      <div className={style.logoBlock}>
        <img className={style.logoImg} src="pot_logo.png" alt="logo" />
        <h1 className={style.logo}>StoneSoup</h1>
      </div>

      <NavBar />
      <Space>
        {location?.pathname === '/searchresult' ? (
          <SearchBar />
        ) : (
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            onClick={handleSearchClick}
          />
        )}

        <Button shape="circle" icon={<UserOutlined />} />
      </Space>
    </header>
  );
}
