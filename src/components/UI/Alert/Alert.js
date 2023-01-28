import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import classes from './Alert.module.css';

const Alert = ({ type, children, time = 5 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, time * 1000);

    return () => {
      clearTimeout(timeId);
    };
  });

  if (!show) {
    return null;
  }

  return createPortal(
    <div className={`${classes.alert} ${classes[`alert--${type}`]}`}>
      {children}
    </div>,
    document.getElementById('alert-root')
  );
};

export default Alert;
