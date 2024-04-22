import { FooterPage, NavbarPage } from 'components/MenuItem';
import Background from 'components/Common/Background';
import React, { useEffect } from 'react';
import styles from './SuccessPage.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

export const Success: React.VFC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('doneMailAuth') !== 'done') {
      navigate('../');
    }
  }, []);
  return (
    <>
      <NavbarPage />
      <Background />
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.checkBox}>
            <CheckCircleIcon />
          </div>
          <h2>メールアドレスの認証が完了しました</h2>
          <p>
            認証したメールアドレスに本登録メールを送信しました
            <br />
            メールに記載されているURLから本登録にお進みください
          </p>
        </div>
      </div>
      <FooterPage />
    </>
  );
};
