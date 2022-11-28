import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '../Button';

import styles from './styles.module.scss';

type ModalProps = {
  id: string;
  isVisible: boolean;
}

export default function Modal({ id, isVisible }: ModalProps) {
  const [visibility, setIsVisibility] = useState(isVisible);

  console.log(isVisible);
  const handleChangeVisibility = () => {
    setIsVisibility(!isVisible);
  };

  if (!visibility) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Button onClick={handleChangeVisibility}>x</Button>
        </header>

        <iframe
          width="100%" height="315"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title="YouTube video player" frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
}

