import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { NavbarPage, FooterPage } from 'components/MenuItem';
import { FaciInfo, State } from 'storetypes';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SelectFacility.module.scss';
import Background from 'components/Common/Background';
import axios from 'axios';
import { baseURL } from 'components/Common/ApiURL';

const EditFacilityCard: React.VFC<{ Facilities: FaciInfo[] }> = ({
  Facilities,
}) => {
  //const [cookies, setCookie, removeCookie] = useCookies(); //これがないとcookies.Jwtは使えなかった。
  const [data, setData] = useState([]);
  // const [faciid, setFaciid] = useState(0);
  // const dispatch = useDispatch();
  // function handleClick(id: number) {
  //   //reduxをつかってSelectDoctorPageでもidが使えるようにした
  //   const input: number = id;
  //   dispatch({ type: 'SET_FID', payload: input });
  // }
  const jwt = localStorage.getItem('Jwt');
  const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
      Jwt: jwt ? jwt : '', //LoginHomeで手に入れたJwtをheaderで送るためにこのように書いている。三項演算子:jwtがtrue(中身があるかどうか)だったらjwtを返す違ったら''を返す。これしないとJwtがNULLの時どうするんだ！と怒られる
    },
  });
  useEffect(() => {
    apiClient
      .get('/auth/patient/patient-facilities')
      .then((response) => {
        setData(response.data.facilities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const cards = data.map((detail) => {
    const { id, name } = detail;
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={3}
        xl={3} //この5つは画面を12分割したとき何個分使うかを表している
        style={{ textAlign: 'center' }}
        key={id} //divからkeyの場所を変えたらWarning: Each child in a list should have a unique "key" prop.が消えた。
      >
        <div>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <CardActions style={{ justifyContent: 'center' }}>
                <Link to={'/SelectDoctor/' + id}>
                  <Button variant="contained" size="medium">
                    選択
                  </Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </Grid>
    );
  });
  return <>{cards}</>;
};

export const SelectFacility: React.VFC = () => {
  const Facility_info = useSelector((state: State) => state.Facility_info);
  return (
    <div className={styles.root}>
      <NavbarPage />
      <Background />
      <div className={styles.content_wrapper}>
        <Container
          sx={{
            display: {
              xs: 'flex',
              sm: 'flex',
              md: 'flex',
              lg: 'flex',
              xl: 'flex',
            },
            my: '5rem',
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <EditFacilityCard Facilities={Facility_info} />
          </Grid>
        </Container>
      </div>
      <FooterPage />
    </div>
  );
};
