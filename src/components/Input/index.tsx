import React, { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input {...props} />
    </div>
  );
}
