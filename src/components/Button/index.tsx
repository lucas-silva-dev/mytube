import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}

export function Button({children, "aria-label": ariaLabel, ...rest }: ButtonProps) {
  return (
    <div className={styles.wrapper} >
      <button {...rest}>
        {children}
      </button>
    </div>
  );
}
