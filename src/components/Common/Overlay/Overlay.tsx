import React from 'react';
import styles from './Overlay.module.scss';

const Overlay: React.VFC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <p>このウェブサイトはヨコ向きに対応していません。</p>
        <p>スマートフォンをタテ向きにしてご利用ください。</p>
      </div>
    </div>
  );
};

export default Overlay;
