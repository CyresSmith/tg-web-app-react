import styles from './Button.module.css';

const Button = props => {
  return <button {...props} className={styles.button_main} />;
};

export default Button;
