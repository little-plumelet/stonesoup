import { UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import style from './style.module.css';
import { NavBar } from './parts/navBar';
import { SearchBar } from './parts/searchBar';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.logoBlock}>
        <img className={style.logoImg} src="pot_logo.png" alt="logo" />
        <h1 className={style.logo}>StoneSoup</h1>
      </div>

      <NavBar />
      <Space>
        <SearchBar />
        <Button shape="circle" icon={<UserOutlined />} />
      </Space>
    </header>
  );
}
