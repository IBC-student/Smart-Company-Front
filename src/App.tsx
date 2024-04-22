import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import Chat from 'components/ChatPage/Chat';
import { SelectDoctor } from 'components/SelectDoctorPage/SelectDoctor';
import { Profile } from 'components/ProfilePage/Profile';
import { LoginHome } from 'components/LoginHomePage/LoginHome';
import { ForgetPassword } from 'components/ForgetPasswordPage/ForgetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MailAuth } from 'components/FirstLoginPage/MailAuth';
import { PrivateRoute } from './PrivateRoute';
import { GuestRoute } from './PrivateRoute';
import Overlay from 'components/Common/Overlay/Overlay';
import { SelectFacility } from 'components/SelectFacilityPage/SelectFacility';
import axios from 'axios';
import { CreateAccount } from 'components/FirstLoginPage/CreateAccount';
import { Success } from 'components/FirstLoginPage/SuccessPage';
import { baseURL } from 'components/Common/ApiURL';
//以下, iOS用高さ取得関数.
const setFillHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
const App: React.VFC = () => {
  const [isSideways, setIsSideways] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const angle = getAngle();
    if (angle == undefined || angle == 0) {
      setIsSideways(false);
    } else {
      setIsSideways(true);
    }

    window.addEventListener('orientationchange', () => {
      const angle = getAngle();
      if (angle == undefined || angle == 0) {
        setIsSideways(false);
      } else {
        setIsSideways(true);
      }
    });

    const jwt = localStorage.getItem('Jwt');
    if (jwt != undefined) {
      //サイトの更新をかけたとき、ログイン状態なのであれば/SelectFacilityに行くようにしている
      const apiClient = axios.create({
        baseURL: baseURL,
        headers: {
          Jwt: jwt ? jwt : '',
        },
      });
      const fetchData = async () => {
        try {
          const response = await apiClient.get('/auth/patient/is-loggedin');
          dispatch({ type: 'SET_ISLOGGED' });
        } catch (error) {
          dispatch({ type: 'SET_ISNOTLOGGED' });
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      {isSideways ? <Overlay /> : null}
      <Router>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/" element={<LoginHome />} />
            {/* <Route path="/ForgetPassword" element={<ForgetPassword />} /> */}
            <Route path="/FirstLogin/MailAuth" element={<MailAuth />} />
            <Route path="/FirstLogin/Success" element={<Success />} />
            <Route
              path="/FirstLogin/CreateAccount"
              element={<CreateAccount />}
            />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/SelectFacility" element={<SelectFacility />} />
            <Route path="/SelectDoctor/:id" element={<SelectDoctor />} />
            <Route path="/Profile" element={<Profile />} />
          </Route>
          {/*<Route path="/Chat" element={<PrivateRoute />}>
            <Route path="/Chat" element={<Chat />} />
  </Route>*/}
        </Routes>
      </Router>
    </>
  );
};

export default App;

function getAngle(): string | number {
  // 角度を取得
  const angle: string | number = window.orientation; // iOS用

  return angle;
}

//formatterは以下の設定
//https://off.tokyo/blog/prettier-vscode/
//prettierをコマンドラインで実行するにはnpx prettier --write ~~.tsx のように書く
/*<Router>
      <Routes>
        <Route path="/" element={<LoginHome />} />
        <Route path="/SelectDoctor" element={<PrivateRoute />}>
          <Route path="/SelectDoctor" element={<SelectDoctor />} />
        </Route>
        <Route path="/Chat" element={<PrivateRoute />}>
          <Route path="/Chat" element={<Chat />} />
        </Route>
        <Route path="/FirstLogin" element={<FirstLogin />} />
      </Routes>
    </Router>*/
