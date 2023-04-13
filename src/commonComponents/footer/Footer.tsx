import style from './style.module.css';

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.logoBlock}>
        <h2 className={style.logo}>Stonesoup</h2>
        <p className={style.logoContent}>
          Indulge in culinary magic with tantalizing recipes and the enchanting
          tale of Stone Soup, where flavors blend like a fairytale come true.
        </p>
      </div>
      <div className={style.navBlock} />
    </footer>
  );
}
