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
      <SearchBar />
    </header>
  );
}
