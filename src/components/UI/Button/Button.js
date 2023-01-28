import classes from './Button.module.css';

const Button = ({ btnType, children }) => (
  <button className={`${classes.btn} ${classes[`btn--${btnType}`]}`}>
    {children}
  </button>
);

export default Button;
