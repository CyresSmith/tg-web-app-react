import { useEffect } from 'react';

import Button from '../Button/Button';
import styles from './Header.module.css';

const tg = window.Telegram.WebApp;

const Header = () => {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className={styles.header}>
      <Button onClick={onClose}>Close</Button>
      <span className={styles.username}>
        {tg.initDataUnsafe?.user?.username}
      </span>
    </div>
  );
};

export default Header;
