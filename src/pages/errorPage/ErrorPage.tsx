import style from './style.module.css';

export function ErrorPage() {
  return (
    <div id="error-page" className={style.errorPage}>
      <div>
        <div className={style.errorTitle}>Oops</div>
        <p>
          <i className={style.errorStatus}>404</i>
          <i className={style.errorText}>Not found</i>
        </p>
      </div>
    </div>
  );
}
