import React, { useEffect, useState } from 'react';
import Background from 'components/Common/Background';
import { NavbarPage, FooterPage } from 'components/MenuItem';
import { Grid } from '@mui/material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import styles from './Profile.module.scss';
import axios from 'axios';

interface ProfileList {
  name: string;
  email: string;
  sex: string;
}
export const Profile: React.VFC = () => {
  const [data, setData] = useState<ProfileList>();
  const apiURL = 'http://localhost:8080/api/v2/auth/patient/is-loggedin';
  const jwt = localStorage.getItem('Jwt');
  const headers = { Jwt: jwt ? jwt : '' };
  useEffect(() => {
    axios
      .get(apiURL, { headers })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <NavbarPage />
      <Background />
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.cotent_wrapper}>
            <Box
              className={styles.box}
              sx={{
                width: '100%',
                padding: '1.25rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card sx={{ width: '70%' }}>
                <CardContent>
                  <p className="h2 text-center mb-4">Profile</p>
                  <Typography variant="h5" fontWeight="bold">
                    お名前
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    {data !== undefined ? <p>{data.name}</p> : ''}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    性別
                  </Typography>
                  <Typography gutterBottom variant="h5">
                    {data !== undefined ? ( //dataがあるか確認、そのあと男なら男性、それ以外なら女性と表示するようにしている。
                      data.sex == 'male' ? (
                        <p>男性</p>
                      ) : (
                        <p>女性</p>
                      )
                    ) : (
                      ''
                    )}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    メールアドレス
                  </Typography>
                  <Typography gutterBottom variant="h5" fontWeight="lighter">
                    {data !== undefined ? <p>{data.email}</p> : ''}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </div>
        </div>
      </div>
      <FooterPage />
    </React.Fragment>
  );
};
