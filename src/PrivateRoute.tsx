import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from './storetypes';

/* type props = {
  element: React.ReactNode;
  path: string;
}; */
export const PrivateRoute: React.VFC = () => {
  const isLoggedin = useSelector((state: State) => state.isLoggedin);
  return (
    <React.Fragment>
      {isLoggedin ? <Outlet /> : <Navigate to="/" />}
    </React.Fragment>
  );
};

export const GuestRoute: React.FC = () => {
  //ログインしているのならログイン画面に飛べないようにした
  const isLoggedIn = useSelector((state: State) => state.isLoggedin);
  return isLoggedIn ? <Navigate to="/Selectfacility" /> : <Outlet />;
};
