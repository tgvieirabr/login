import React from 'react';
import styles from './Loading.module.css';
import { ReactComponent as MeuLoading } from '../../Assets/loading.svg';

const Loading = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.loading}>
        <MeuLoading className={styles.loadingicon}/>
      </div>
    </div>
  );
};

export default Loading;
