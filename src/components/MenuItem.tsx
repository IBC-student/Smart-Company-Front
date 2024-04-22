import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBMask,
  MDBRow,
  MDBFooter,
  MDBCol,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Button,
  createTheme,
  IconButton,
  Modal,
  Typography,
  Grid,
  ThemeProvider,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
interface Helpdata {
  id: number;
  title: string;
  text: string;
}
import PositionedMenu from './PositionedMenu';
import { State } from '../storetypes';
import { useSelector } from 'react-redux';

export const NavbarPage: React.VFC = () => {
  const s_helpdata = JSON.stringify([
    {
      title: '再診の仕方を教えてください。',
      text: '次の手順で行ってください\n１．診察券番号とお名前を入力し「Sign in」を押してください。\n２．先生を選択してください。\n３．チャットにて受診できます。',
    },
    {
      title: '初診の仕方を教えてください。',
      text: '次の手順で行ってください。\n１．「はじめて問診を受けられる方はこちら」を教えてください。\n２．氏名と生年月日を入力し「Sign up」を押してください。\n３．チャットにて受診してください。',
    },
  ]);

  const style = {
    position: 'absolute' /* as 'absolute' */,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0.5,
    height: 300,
  };

  const childstyle = {
    position: 'absolute' /* as 'absolute' */,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    innerHeight: '50%',
    outerHeight: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0.5,
    height: 300,
  };

  let helpdata: Array<Helpdata> = JSON.parse(s_helpdata);

  const [open, setOpen] = React.useState(false);
  const [copen, setcOpen] = React.useState(false);
  const [helptext, sethelptext] = React.useState('');
  const [helptitle, sethelptitle] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlecOpen = () => setcOpen(true);
  const handlecClose = () => setcOpen(false);
  const isLoggedin = useSelector((state: State) => state.isLoggedin);
  const linkTo = isLoggedin ? '/SelectFacility' : '/'; //ログインしてるなら/SelectFacilityに飛び、してないなら/に飛ぶ

  const CharShaping = (msg: string) => {
    return msg.split('\n').map((item, id) => {
      return (
        <React.Fragment key={id}>
          {item}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <header>
      <Box
        sx={{
          height: { xs: 60, sm: 80 },
        }}
      >
        <Toolbar>
          <Button
            sx={{
              fontSize: 20,
              fontWeight: 800,
              color: '#000',
            }}
            component={Link}
            to={linkTo}
          >
            AI問診君
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            aria-controls="menu-appbar"
            sx={{ p: 0, mr: 2.5, color: '#000' }}
            onClick={handleOpen}
          >
            <QuestionMarkIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
          </IconButton>
          {isLoggedin && <PositionedMenu />}
          {/* isLoggedinがtrueのときだけログアウトなどが見えるようになっている。 */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container>
                <Typography sx={{ fontSize: { xs: 18, sm: 25 }, ml: 1.25 }}>
                  Q&A
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  aria-controls="menu-appbar"
                  color="inherit"
                  sx={{ p: 0, mr: 1.25 }}
                  onClick={handleClose}
                >
                  <CloseIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                </IconButton>
              </Grid>
              {helpdata.map((val, id) => (
                <div key={id}>
                  <Button
                    onClick={() => {
                      handlecOpen();
                      sethelptitle(val.title);
                      sethelptext(val.text);
                    }}
                    sx={{
                      fontSize: { xs: 15, sm: 18 },
                    }}
                  >
                    {val.title}
                  </Button>
                  <Modal hideBackdrop open={copen} onClose={handlecClose}>
                    <Box sx={childstyle}>
                      <Grid container>
                        <Typography
                          sx={{ fontSize: { xs: 18, sm: 25 }, ml: 1.25 }}
                        >
                          Q&A
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                          aria-controls="menu-appbar"
                          color="inherit"
                          sx={{ p: 0, mr: 1.25 }}
                          onClick={handlecClose}
                        >
                          <CloseIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                        </IconButton>
                      </Grid>
                      <Typography sx={{ ml: 1.25 }}>Q.{helptitle}</Typography>
                      <br />
                      <Typography sx={{ ml: 1.25 }}>
                        A.{CharShaping(helptext)}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              ))}
            </Box>
          </Modal>
        </Toolbar>
      </Box>
    </header>
  );
};
export const FooterPage: React.VFC = () => {
  return (
    <footer>
      <div className="footer-copyright text-center">
        &copy; {new Date().getFullYear()} Copyright:&nbsp;
        <a href="http://ibc948.co.jp" className="color_white">
          iBusiness Center.com
          <LinkIcon sx={{ fontSize: 20 }} />
        </a>
      </div>
    </footer>
  );
};
