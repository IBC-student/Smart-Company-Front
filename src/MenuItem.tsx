import React, { useState } from 'react';
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

interface Helpdata {
  id: number;
  title: string;
  text: string;
}

export const NavbarPage: React.VFC = () => {
  const s_helpdata = JSON.stringify([
    {
      id: 1,
      title: 'どうやってメッセージを送りますか？',
      text: '頑張ってください',
    },
    {
      id: 2,
      title: '先生をどうやって選びますか？',
      text: '気合です',
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
    p: 4,
    height: 300,
  };

  const childstyle = {
    position: 'absolute' /*  as 'absolute' */,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    innerHeight: '50%',
    outerHeight: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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

  return (
    <Box
      sx={{
        height: { xs: 60, sm: 80 },
      }}
    >
      <AppBar sx={{ bgcolor: '#111111' }}>
        <Toolbar>
          <Button
            color="inherit"
            sx={{ fontSize: { xs: 15, sm: 20 } }}
            href="/"
          >
            飯塚市立病院
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            aria-controls="menu-appbar"
            color="inherit"
            sx={{ p: 0, mr: 20 }}
            onClick={handleOpen}
          >
            <QuestionMarkIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container>
                <Typography sx={{ fontSize: { xs: 18, sm: 25 }, ml: 10 }}>
                  Q&A
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  aria-controls="menu-appbar"
                  color="inherit"
                  sx={{ p: 0, mr: 10 }}
                  onClick={handleClose}
                >
                  <CloseIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                </IconButton>
              </Grid>
              {helpdata.map((val) => (
                <div key={val.id}>
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
                          sx={{ fontSize: { xs: 18, sm: 25 }, ml: 10 }}
                        >
                          Q&A
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                          aria-controls="menu-appbar"
                          color="inherit"
                          sx={{ p: 0, mr: 10 }}
                          onClick={handlecClose}
                        >
                          <CloseIcon sx={{ fontSize: { xs: 20, sm: 25 } }} />
                        </IconButton>
                      </Grid>
                      <Typography sx={{ ml: 10 }}>Q.{helptitle}</Typography>
                      <br />
                      <Typography sx={{ ml: 10 }}>A.{helptext}</Typography>
                    </Box>
                  </Modal>
                </div>
              ))}
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export const FooterPage: React.VFC = () => {
  return (
    <div className="footer">
      {/* <MDBFooter color="indigo" className="font-small">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol md="6" className="custom_footer">
                            <h5 className="title">Links</h5>
                            <ul>
                                <li className="list-unstyled">
                                    <a href="https://iizukacityhp.jp/#">飯塚市立病院HP</a>
                                    <br />
                                    <a href="https://stories.freepik.com/work">
                                        Illustration by Freepik Stories
                                    </a>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid className="m-0 p-0">
                        &copy; {new Date().getFullYear()} Copyright:{' '}
                        <a href="https://ibc948.co.jp"> iBusiness Center.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter> */}
    </div>
  );
};
