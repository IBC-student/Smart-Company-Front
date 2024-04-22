import React, { useEffect, useState } from 'react';
import { NavbarPage, FooterPage } from 'components/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { State, AlertInfo, PatientInfo } from 'storetypes';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Card, CardContent, Input, TextField } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import styles from './LoginHome.module.scss';
import Background from 'components/Common/Background';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { baseURL } from 'components/Common/ApiURL';

export const LoginHome: React.VFC = () => {
  const navigate = useNavigate();
  //const [cookies, setCookie, removeCookie] = useCookies(); //cookieに保存するためにreact-cookieを使用
  const patient_mail = useSelector((state: State) => state.patient_mail);
  const patient_password = useSelector(
    (state: State) => state.patient_password
  );
  const isLoggedin = useSelector((state: State) => state.isLoggedin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_ISNOTFIRST' });
  });
  const onChangeUsermail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const input: string = String(e.currentTarget.value);
    dispatch({ type: 'SET_PID', payload: input });
  };
  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const input: string = String(e.currentTarget.value);
    dispatch({ type: 'SET_PNAME', payload: input });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const submitLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const sendstyle = JSON.stringify({
      email: patient_mail,
      password: patient_password,
    });
    apiClient
      .post('/auth/patient/login', sendstyle)
      .then(async (res) => {
        const Jwt = res.headers.jwt;
        const monshin_id = res.data.monshin_id;
        const name = res.data.name;
        // setCookie('Jwt', Jwt);
        // setCookie('monshin_id', monshin_id);
        // setCookie('name', name); //これでcookieにJwt、monshin_id、nameが保存される。cookie.JwtでJwtを取り出せる。cookie使わなくなった
        localStorage.setItem('Jwt', Jwt); //localStorage,sessionStorageはこれだけで入れられる
        localStorage.setItem('monshin_id', monshin_id);
        localStorage.setItem('name', name);
        const setdata: PatientInfo = res.data;
        await dispatch({ type: 'SET_ISLOGGED' });
        navigate('../SelectFacility');
      })
      .catch(async (e) => {
        const Alertmsg: AlertInfo = {
          message: 'メールアドレスまたはパスワードが違います',
          isOpen: true,
        };
        await dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg });
      });
  };
  return (
    <React.Fragment>
      <NavbarPage />
      <Background />
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.content_wrapper}>
            <Box
              className={styles.box}
              sx={{ flex: { md: '0 0 50%' }, maxWidth: { md: '50%' } }}
            >
              <Card>
                <CardContent sx={{ padding: '1.25rem' }}>
                  <p className="h5 text-center mb-4">Sign in</p>
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
                      <div className={styles.input}>
                        <label htmlFor="upassword" style={{ margin: 0 }}>
                          <HttpsIcon
                            fontSize="large"
                            sx={{ mr: 1, my: 1, cursor: 'pointer' }}
                          />
                        </label>
                        <FormControl
                          sx={{ flex: 1 }}
                          variant="standard"
                          size="medium"
                        >
                          <InputLabel htmlFor="upassword" style={{ margin: 0 }}>
                            パスワード
                          </InputLabel>
                          <Input
                            id="upassword"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => onChangePassword(e)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                      {/* <div style={{ marginTop: '-20px', marginBottom: '30px' }}>
                        <Link to="/ForgetPassword">パスワードを忘れた場合</Link>
                      </div> */}
                    </div>
                    <div className="text-center">
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={submitLogin}
                      >
                        Sign in
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <Link to="/FirstLogin/MailAuth">
                はじめて問診を受けられる方はこちら
              </Link>
            </Box>
          </div>
        </div>
      </div>
      <FooterPage />
    </React.Fragment>
  );
};
