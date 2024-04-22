import React, { useEffect, useState } from 'react';
import { NavbarPage, FooterPage } from 'components/MenuItem';
import Background from 'components/Common/Background';
import {
  Button,
  TextField,
  FormControl,
  Container,
  Grid,
  Card,
  Stack,
  Typography,
  CardContent,
  CardHeader,
  CardActions,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  createTheme,
  ThemeProvider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  OutlinedInput,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CreateAccount.module.scss';
import { State, AlertInfo } from 'storetypes';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { baseURL } from 'components/Common/ApiURL';

interface Info {
  fname: string;
  lname: string;
  year: string;
  month: string;
  day: string;
  mBirthday: string;
  email: string;
  birthday: string;
  sex: string;
  password: string;
  passwordCheck: string;
}
let flag: number = 0;

export const CreateAccount: React.VFC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams(); //URLからtokenを取ってくる用

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();

  let s_nowMonth: string, s_nowDate: string;
  if (nowMonth <= 9) {
    s_nowMonth = '0' + nowMonth;
  } else {
    s_nowMonth = nowMonth.toString();
  }
  if (nowDate <= 9) {
    s_nowDate = '0' + nowDate;
  } else {
    s_nowDate = nowDate.toString();
  }
  const [values, setValues] = React.useState<Info>({
    fname: '',
    lname: '',
    year: '',
    month: '',
    day: '',
    email: '',
    birthday: '',
    mBirthday: nowYear + '-' + s_nowMonth + '-' + s_nowDate,
    sex: '',
    password: '',
    passwordCheck: '',
  });

  useEffect(() => {
    setSearchParams('token');
    let Token = searchParams.get('token');
    if (Token === null) {
      Token = '';
    }
    sessionStorage.setItem('Token', Token);
    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Token: Token,
      },
    });
    apiClient
      .get('/temp-patient/confirm-token')
      .then((response) => {
        setValues({ ...values, email: response.data.email });
      })
      .catch((error) => {
        navigate('/');
      });
  }, []);

  const Alertmsg1: AlertInfo = {
    message: 'お名前を入力してください',
    isOpen: true,
  };
  const Alertmsg2: AlertInfo = {
    message: '生年月日を入力してください',
    isOpen: true,
  };
  const Alertmsg3: AlertInfo = {
    message: '正しい生年月日を入力してください',
    isOpen: true,
  };
  const Alertmsg4: AlertInfo = {
    message: '性別を選択してください',
    isOpen: true,
  };
  const Alertmsg5: AlertInfo = {
    message: 'パスワードが一致していません',
    isOpen: true,
  };
  const Alertmsg6: AlertInfo = {
    message: 'パスワードが正しく設定されていることを確認してください',
    isOpen: true,
  };

  const handleAPI = (birthday: string) => {
    const longname: string = values.fname + values.lname;

    let Token = sessionStorage.getItem('Token');
    if (Token === null) {
      Token = '';
    }
    const sendstyle = JSON.stringify({
      name: longname,
      birthday: birthday,
      password: values.password,
      sex: values.sex,
    });

    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        Token: Token,
      },
    });
    apiClient
      .post('/temp-patient/register', sendstyle)
      .then(async (res) => {
        localStorage.setItem('Jwt', res.headers.jwt);
        localStorage.setItem('name', res.data.name);
        dispatch({ type: 'SET_ISLOGGED' });
        navigate('../SelectFacility');
      })
      .catch(async (error) => {
        dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg6 });
      });
  };

  const theme = createTheme({
    typography: {
      h5: {
        fontSize: 20,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 604,
        md: 864,
        lg: 1200,
        xl: 1536,
      },
    },
    spacing: 1,
  });

  let yearList: Array<string> = new Array(150);
  for (let i = 0; i < 150; i++) {
    const date = new Date(i + nowYear - 149, 1, 1, 0, 0);
    const jpdata = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
      era: 'long',
    }).format(date);
    yearList[i] =
      i +
      nowYear -
      149 +
      '年（' +
      jpdata.substring(0, jpdata.indexOf('/')) +
      '年）';
  }

  let monthList: Array<string> = new Array(12);
  for (let i = 1; i <= 9; i++) {
    monthList[i] = '0' + i.toString();
  }
  for (let i = 10; i <= 12; i++) {
    monthList[i] = i.toString();
  }

  let dayList: Array<string> = new Array(31);
  for (let i = 1; i <= 9; i++) {
    dayList[i] = '0' + i.toString();
  }
  for (let i = 10; i <= 31; i++) {
    dayList[i] = i.toString();
  }

  const handleLogin = () => {
    let tbirthday: string = '';
    if (!values.fname || !values.lname) {
      dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg1 });
      return;
    }
    if (flag === 0) {
      dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg2 });
      return;
    } else if (flag === 1) {
      if (!values.year || !values.month || !values.day) {
        dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg2 });
        return;
      }
      tbirthday = values.year + '-' + values.month + '-' + values.day;
    } else if (flag === 2) {
      tbirthday =
        values.mBirthday.substring(0, 4) +
        '-' +
        values.mBirthday.substring(5, 7) +
        '-' +
        values.mBirthday.substring(8);
    }
    if (
      nowYear.toString() === tbirthday.substring(0, 4).toString() &&
      s_nowMonth <= tbirthday.substring(5, 7).toString()
    ) {
      if (s_nowMonth === tbirthday.substring(5, 7).toString()) {
        if (Number(s_nowDate) < Number(tbirthday.substring(8, 10))) {
          dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg3 });
          return;
        }
      } else {
        dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg3 });
        return;
      }
    }
    if (!values.sex) {
      dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg4 });
      return;
    }
    if (values.password !== values.passwordCheck) {
      dispatch({ type: 'SET_ALERTINFO', payload: Alertmsg5 });
      return;
    }
    handleAPI(tbirthday);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  //構造体valuesにフォームに入力された値を保存
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //let prop: any = event.currentTarget.getAttribute('prop-type');
    let prop: any = event.target.name;
    if (prop == 'mBirthday') {
      flag = 2;
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeSex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, sex: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    let prop: any = event.target.name;
    flag = 1;
    console.log(flag);
    setValues({ ...values, [prop]: event.target.value });
  };

  const onChangePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setValues({ ...values, password: e.currentTarget.value });
  };

  const onChangePasswordCheck = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setValues({ ...values, passwordCheck: e.currentTarget.value });
  };

  //パスワード表示非表示機能
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <NavbarPage />
      <Background />
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <ThemeProvider theme={theme}>
            <Container sx={{ bgcolor: '#d8d8d8' }}>
              <Stack component="form" onSubmit={onSubmit} noValidate>
                <Card
                  sx={{
                    margin: 'auto',
                    width: { xs: '90%', md: '75%' },
                  }}
                >
                  <Container>
                    <CardHeader
                      title="新規登録"
                      align="center"
                      style={{
                        margin: 'auto',
                        width: '70%',
                      }}
                    />

                    <CardContent>
                      {/* メールアドレス表示 */}
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Grid
                          item
                          sx={{
                            ml: 2,
                            width: { xs: 0, sm: 90 },
                            my: 14,
                            display: { xs: 'none', sm: 'block' },
                          }}
                        >
                          <Typography sx={{ fontSize: { xs: 0, sm: 20 } }}>
                            メール
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            ml: { xs: 0, md: 8 },
                            width: { xs: 0, md: 50 },
                          }}
                        >
                          <EmailIcon
                            sx={{
                              color: 'action.active',
                              my: 8,
                              fontSize: { xs: 0, md: 40 },
                            }}
                          />
                        </Grid>

                        <Grid
                          item
                          sx={{
                            ml: { xs: 'auto', sm: 20 },
                            mr: { xs: 'auto', sm: 0 },
                            mt: { xs: 'auto', sm: 'auto' },
                            mb: { xs: 'auto', sm: 'auto' },
                            width: { xs: 'auto', sm: 'auto' },
                          }}
                        >
                          <Typography variant="subtitle1" gutterBottom>
                            {values.email}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* 名前入力欄 */}
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Grid
                          item
                          sx={{
                            ml: 2,
                            width: { xs: 0, sm: 90 },
                            my: 14,
                            display: { xs: 'none', sm: 'block' },
                          }}
                        >
                          <Typography sx={{ fontSize: { xs: 0, sm: 20 } }}>
                            お名前
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            ml: { xs: 0, md: 8 },
                            width: { xs: 0, md: 50 },
                          }}
                        >
                          <AccountCircle
                            sx={{
                              color: 'action.active',
                              my: 8,
                              fontSize: { xs: 0, md: 40 },
                            }}
                          />
                        </Grid>

                        <Grid
                          item
                          sx={{
                            ml: { xs: 'auto', sm: 8 },
                            mr: { xs: 0, sm: 0 },
                            width: { xs: 146, sm: 196 },
                          }}
                        >
                          <TextField
                            value={values.fname}
                            name="fname"
                            onChange={handleChange}
                            label="姓"
                            placeholder="問診"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            ml: { xs: 8, sm: 8 },
                            mr: { xs: 'auto', sm: 0 },
                            width: { xs: 146, sm: 196 },
                          }}
                        >
                          <TextField
                            value={values.lname}
                            name="lname"
                            onChange={handleChange}
                            label="名"
                            placeholder="太郎"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                      {/* 性別入力欄 */}
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Grid
                          item
                          sx={{
                            ml: 2,
                            width: { xs: 0, sm: 90 },
                            my: 14,
                            display: { xs: 'none', sm: 'block' },
                          }}
                        >
                          <Typography sx={{ fontSize: { xs: 0, sm: 20 } }}>
                            性別
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            ml: { xs: 0, md: 8 },
                            width: { xs: 0, md: 50 },
                          }}
                        />
                        <Grid
                          item
                          sx={{
                            my: 8,
                            ml: { xs: 'auto', sm: 8 },
                            mr: { xs: 'auto', sm: 0 },
                          }}
                        >
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              value={values.sex}
                              onChange={handleChangeSex}
                            >
                              <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="男性"
                              />
                              <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="女性"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>

                      {/* 生年月日入力欄 */}
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Grid item sx={{ m: { xs: 'auto', sm: 0 } }}>
                          <TextField
                            value={values.mBirthday}
                            name="mBirthday"
                            onChange={handleChange}
                            type="date"
                            label="生年月日"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            sx={{
                              display: { sm: 'none' },
                              width: { xs: 145, sm: 0 },
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            width: { xs: 0, sm: 90 },
                            my: 14,
                            ml: { xs: 0, sm: 2 },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: 0, sm: 20 },
                              display: { xs: 'none', sm: 'block' },
                            }}
                          >
                            生年月日
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            width: { xs: 0, md: 50 },
                            ml: { xs: 0, md: 8 },
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{
                              color: 'ActiveCaption.active',
                              my: 8,
                              fontSize: { xs: 0, md: 40 },
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            width: { xs: 0, sm: 200 },
                            display: { xs: 'none', sm: 'block' },
                            ml: { xs: 0, sm: 8 },
                          }}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="year-select-label">年</InputLabel>
                            <Select
                              value={values.year}
                              name="year"
                              onChange={handleSelectChange}
                              id="year-select"
                              labelId="year-select-label"
                              label="年"
                              sx={{ fontSize: { xs: 0, sm: 16 } }}
                            >
                              {yearList.map((val) => (
                                <MenuItem key={val} value={val.substring(0, 4)}>
                                  {val}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: { xs: 'none', sm: 'block' },
                            ml: { xs: 0, sm: 8 },
                          }}
                        >
                          <Grid container spacing={8}>
                            <Grid
                              item
                              sx={{
                                width: { xs: 0, sm: 100 },
                                margin: { xs: 0, sm: 'auto' },
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel id="month-select-label">
                                  月
                                </InputLabel>
                                <Select
                                  value={values.month}
                                  name="month"
                                  onChange={handleSelectChange}
                                  id="month-select"
                                  labelId="month-select-label"
                                  label="月"
                                  sx={{ fontSize: { xs: 0, sm: 16 } }}
                                >
                                  {monthList.map((val) => (
                                    <MenuItem key={val.toString()} value={val}>
                                      {val}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid
                              item
                              sx={{ width: { xs: 0, sm: 100 }, margin: 'auto' }}
                            >
                              <FormControl fullWidth>
                                <InputLabel id="day-select-label">
                                  日
                                </InputLabel>
                                <Select
                                  value={values.day}
                                  name="day"
                                  onChange={handleSelectChange}
                                  id="day-select"
                                  labelId="day-select-label"
                                  label="日"
                                  sx={{ fontSize: { xs: 0, sm: 16 } }}
                                >
                                  {dayList.map((val) => (
                                    <MenuItem key={val.toString()} value={val}>
                                      {val}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* パスワード入力欄 */}
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Grid
                          item
                          sx={{
                            ml: 2,
                            width: { xs: 0, sm: 90 },
                            my: 14,
                            display: { xs: 'none', sm: 'block' },
                          }}
                        >
                          <Typography sx={{ fontSize: { xs: 0, sm: 17 } }}>
                            パスワード
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            ml: { xs: 0, md: 8 },
                            width: { xs: 0, md: 50 },
                          }}
                        >
                          <HttpsIcon
                            sx={{
                              my: 8,
                              fontSize: { xs: 0, md: 40 },
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          sx={{
                            ml: { xs: 'auto', sm: 8 },
                            mr: { xs: 'auto', sm: 0 },
                            width: { xs: 200, sm: 400 },
                          }}
                        >
                          <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                              パスワード
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => onChangePassword(e)}
                              id="outlined-adornment-password"
                              type={showPassword ? 'text' : 'password'}
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
                              label="パスワード"
                            />
                          </FormControl>
                        </Grid>
                      </Grid>

                      {/* パスワードの確認 */}
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Grid
                          item
                          sx={{
                            ml: 2,
                            width: { xs: 0, sm: 90 },
                            my: 14,
                            display: { xs: 'none', sm: 'block' },
                          }}
                        />
                        <Grid
                          item
                          sx={{
                            ml: { xs: 0, md: 8 },
                            width: { xs: 0, md: 50 },
                          }}
                        />
                        <Grid
                          item
                          sx={{
                            ml: { xs: 'auto', sm: 8 },
                            mr: { xs: 'auto', sm: 0 },
                            width: { xs: 200, sm: 400 },
                          }}
                        >
                          <FormControl
                            // sx={{ m: 1, width: '45ch' }}
                            variant="outlined"
                          >
                            <InputLabel htmlFor="outlined-adornment-password">
                              パスワードの確認
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => onChangePasswordCheck(e)}
                              id="outlined-adornment-password"
                              type={showPassword ? 'text' : 'password'}
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
                              label="パスワードの確認"
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={0}
                        className={styles.content_wrapper}
                      >
                        <Typography variant="body2" color="text.secondary">
                          ※パスワードは1文字以上の半角大文字英字・半角小文字英字・数字を含む、8文字以上の文字列である必要があります
                        </Typography>
                      </Grid>
                    </CardContent>

                    <CardActions>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button variant="contained" type="submit">
                          新規登録
                        </Button>
                      </Grid>
                    </CardActions>
                  </Container>
                </Card>
              </Stack>
            </Container>
          </ThemeProvider>
        </div>
      </div>
      <FooterPage />
    </React.Fragment>
  );
};
