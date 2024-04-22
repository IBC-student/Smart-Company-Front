import React from 'react';
import { FooterPage, NavbarPage } from 'components/MenuItem';
import Background from 'components/Common/Background';

export const ForgetPassword: React.VFC = () => {
  return (
    <React.Fragment>
      <NavbarPage />
      <Background />

      <FooterPage />
    </React.Fragment>
  );
};
