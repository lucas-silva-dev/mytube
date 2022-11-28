import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.module.scss'

type LoaderProps = {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>,
    document.getElementById('loader-root') as HTMLElement,
  );
}
