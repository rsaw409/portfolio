import styles from "./index.module.css";

const ErrorPage = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <div className={styles.icon} aria-hidden="true">
            404
          </div>
        </div>

        <p className={styles.code}>Page not found</p>
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.subtitle}>
          We couldn’t find the page you’re looking for. Possible reasons are:
        </p>

        <ul className={styles.reasons}>
          <li>This URL does not exist</li>
          <li>This user does not exist</li>
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleGoHome}
          >
            Go Home
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
