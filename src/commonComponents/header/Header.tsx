import style from './style.module.css';
import { NavBar } from './parts/NavBar';

export function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>StoneSoup</h1>
      <NavBar />
    </header>
  );
}
