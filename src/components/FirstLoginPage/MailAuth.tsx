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

  // //追加分
  // const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  // const context = canvas.getContext('2d');

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
                {/* 追加分 */}
                <Stepper alternativeLabel sx={{ marginBottom: '20px' }}>
                  <Step>
                    <StepLabel>
                      <p className="h6 text-center">メール登録・認証</p>
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
                {/* <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent>
                        <p className="h5 text-left mb-4">
                          STEP1:メール登録・認証
                        </p>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent>
                        <p className="h5 text-left mb-4">STEP2</p>
                        <div id="step2" className={styles.step}>
                          <h2>Step 2: ユーザ登録</h2>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card>
                      <CardContent>
                        <div id="step3" className={styles.step}>
                          <h2>Step 3: 問診チャット</h2>
                          <input type="text" placeholder="Address">
                        <input type="text" placeholder="City">
                        <input type="text" placeholder="Country">
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid> */}
                <Card>
                  <CardContent sx={{ padding: '1.25rem' }}>
                    <p className="h5 text-center mb-4">メール登録・認証</p>
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
                      <div className="text-center">
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={submitMail}
                        >
                          メール認証
                        </Button>
                      </div>
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
