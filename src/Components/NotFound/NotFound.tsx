// NotFound.tsx

import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.text}>Oops! The page you are looking for does not exist.</p>
        <button className={styles.button} onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
