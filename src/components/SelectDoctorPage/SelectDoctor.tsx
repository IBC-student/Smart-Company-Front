import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
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
import { Link, useParams } from 'react-router-dom';
import { NavbarPage, FooterPage } from 'components/MenuItem';
import { DocInfo, State } from 'storetypes';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SelectDoctor.module.scss';
import Background from 'components/Common/Background';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import { DetailsTwoTone } from '@mui/icons-material';
import { baseURL } from 'components/Common/ApiURL';

interface department {
  id: number;
  name: string;
}

interface managers {
  id: number;
  name: string;
  is_dummy: boolean;
  departments: department[];
}

const EditDoctorCard: React.VFC<{ Doctors: DocInfo[] }> = ({ Doctors }) => {
  //ここで言うuidは患者のではなく医師の識別用id
  const dispatch = useDispatch();
  const Doctor_name = useSelector((state: State) => state.Doctor_name);
  const [data, setData] = useState<managers[]>([]);
  const { id } = useParams<{ id: string }>(); //URLにつけたパラメータを使うための二行
  const parsedId = parseInt(id ?? '0', 10);

  // const DoctorHandler = async (detail: DocInfo) => {
  //   await dispatch({ type: 'SET_DRNAME', payload: detail.name });
  //   await dispatch({ type: 'SET_DRID', payload: detail.uid });
  //   speechAPI('お加減はいかがですか？');
  // };
  useEffect(() => {
    //useEffectを使うことでページ更新時にこの中身を一回だけ実行するようになっている。
    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const sendstyle = JSON.stringify({
      monshin_id: localStorage.getItem('monshin_id'), //localStorageからmonshin_idを取得してる
      facility_id: parsedId,
    });
    apiClient
      .post('/managers', sendstyle)
      .then((response) => {
        setData(response.data.managers);
        console.log(response.data.managers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getColor = (uid: string) => {
    //iconの色を決める
    //let colorString = uid.slice(0, 3);
    // uidが数字のみの場合は、uid自身をcolorStringとして使用する
    let colorString = /^[0-9]+$/.test(uid) ? uid : uid.slice(0, 3);

    let changeAscii: string[] = [];
    let ascii10: number[] = [];
    let ascii16: string[] = [];
    let minascii: number = 65;
    let colorcode: string = '#';
    for (let i = 0; i < 3; i++) {
      changeAscii[i] = colorString.slice(i, i + 1);
      ascii10[i] = Number(changeAscii[i].codePointAt(0));
      ascii10[i] = Math.floor((255 * Math.abs(ascii10[i] - minascii)) / 57);
      ascii16[i] = ascii10[i].toString(16);
      colorcode += ascii16[i];
    }

    return colorcode;
  };

  const cards = data
    ? data.map((detail) => {
        const str: string = !detail.is_dummy //ver1時代のgetColorをそのまま使おうとすると、1文字しかないidでは同じ色になるため、英語を加えた
          ? detail.departments[0].id.toString() + 'dc'
          : '4567';
        let colorcode = getColor(str);
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            xl={3}
            style={{ textAlign: 'center' }}
            key={detail.id}
          >
            <div>
              <Card>
                <CardContent>
                  <Avatar
                    style={{ position: 'absolute', backgroundColor: colorcode }}
                  >
                    {detail.is_dummy ? '初診' : detail.name.slice(0, 2)}{' '}
                  </Avatar>
                  <Typography gutterBottom variant="h5" component="div">
                    {detail.is_dummy ? '初診用' : detail.name + '先生'}
                  </Typography>
                  <div
                    style={{
                      //内科などの要素を水平に並べ、真ん中に持ってくるようにした
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {!detail.is_dummy ? (
                      detail.departments.map((department, index) => (
                        <div
                          key={department.id}
                          style={{ marginLeft: index !== 0 ? '16px' : '0' }} //二つ以上診療科があるときのため、間が空くようにした
                        >
                          <Typography variant="body2" color="text.secondary">
                            {department.name}
                          </Typography>
                        </div>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        初診の方はこちら
                      </Typography>
                    )}
                  </div>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Link to="/Chat">
                      <Button
                        variant="contained"
                        size="medium"
                        // onClick={() => DoctorHandler(detail)}
                      >
                        問診開始
                      </Button>
                    </Link>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          </Grid>
        );
      })
    : null;
  return <>{cards}</>;
};
export const SelectDoctor: React.VFC = () => {
  const Doctor_info = useSelector((state: State) => state.Doctor_info);
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
          <Grid container spacing={2}>
            <EditDoctorCard Doctors={Doctor_info} />
          </Grid>
        </Container>
      </div>
      <FooterPage />
    </div>
  );
};
