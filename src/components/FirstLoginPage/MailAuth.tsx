import React, { useState } from 'react';
import { NavbarPage, FooterPage } from 'components/MenuItem';
import Background from 'components/Common/Background';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Input,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import styles from './MailAuth.module.scss';
import { useNavigate } from 'react-router-dom';
import { baseURL } from 'components/Common/ApiURL';
import { AlertInfo } from 'storetypes';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const MailAuth: React.VFC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Usermail, setUsermail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onChangeUsermail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setUsermail(e.currentTarget.value);
  };
  const Alertmsg1: AlertInfo = {
    message: 'メール認証に失敗しました',
    isOpen: true,
  };

  const submitMail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const sendstyle = {
      email: Usermail,
    };
    apiClient
      .post('/temp-patient/token-patient', sendstyle)
      .then(async (res) => {
        setIsLoading(false);
        sessionStorage.setItem('doneMailAuth', 'done');
        navigate('../FirstLogin/Success');
      })
      .catch(async (e) => {
        dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg1 });
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <NavbarPage />
      <Background />
      <div className={styles.root}>
        <div className={`${isLoading ? styles.isLoading : ''}`}>
          {isLoading ? <div className={styles.loading} /> : ''}
          <div className={styles.wrapper}>
            <div className={styles.content_wrapper}>
              <Box
                className={styles.box}
                sx={{ flex: { md: '0 0 50%' }, maxWidth: { md: '50%' } }}
              >
                {/* Step */}
                <Stepper alternativeLabel sx={{ marginBottom: '10%' }}>
                  <Step>
                    <StepLabel>
                      <p className="h6 text-center">メール認証</p>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <p className="h6 text-center">ユーザー登録</p>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <p className="h6 text-center">問診チャット</p>
                    </StepLabel>
                  </Step>
                </Stepper>

                <Card>
                  <CardContent sx={{ padding: '1.25rem' }}>
                    <p className="h5 text-center mb-4">メール認証</p>
                    <form>
                      <div className={styles.input_field}>
                        <div className={styles.input}>
                          <label htmlFor="umail" style={{ margin: 0 }}>
                            <EmailIcon
                              fontSize="large"
                              sx={{ mr: 1, my: 1, cursor: 'pointer' }}
                            />
                          </label>
                          <TextField
                            variant="standard"
                            label="メールアドレス"
                            type="text"
                            id="umail"
                            sx={{ flex: 1 }}
                            onChange={(e) => onChangeUsermail(e)}
                          />
                        </div>
                      </div>
                      <Stack
                        spacing={12}
                        direction="row"
                        justifyContent="center"
                      >
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={submitMail}
                        >
                          再送
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={submitMail}
                        >
                          メール認証
                        </Button>
                      </Stack>
                    </form>
                  </CardContent>
                </Card>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </React.Fragment>
  );
};
