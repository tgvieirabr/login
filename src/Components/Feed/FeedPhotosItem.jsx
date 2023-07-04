import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from '../Helper/Image';

const FeedPhotosItem = ({ title, thumb, user_name, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={thumb} alt={title} />
      <div>{user_name}</div>
      <span className={styles.visualizacao}>{thumb.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;