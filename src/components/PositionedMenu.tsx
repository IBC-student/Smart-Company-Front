//MenuItem右上の・・・の縦バージョンのやつ
import React from 'react';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Profile } from 'components/ProfilePage/Profile';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { State, AlertInfo, PatientInfo } from 'storetypes';
import { baseURL } from './Common/ApiURL';

export default function PositionedMenu() {
  const isLoggedin = useSelector((state: State) => state.isLoggedin);
  const dispatch = useDispatch();
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('../Profile');
  };
  const handleLogout = () => {
    //ログアウトするためapiにJwtを送っている。handleCloseもしたいためhandleCloseの内容が入ってる。
    setAnchorEl(null);
    const jwt = localStorage.getItem('Jwt');
    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        Jwt: jwt ? jwt : '',
      },
    });

    apiClient
      .delete('/auth/patient/logout')
      .then(() => {
        dispatch({ type: 'SET_ISNOTLOGGED' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ backgroundColor: open ? '#00bfff' : 'none' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={{ fontSize: '20px' }}>{name}さん</MenuItem>
        <MenuItem onClick={handleProfile}>プロフィール</MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
          ログアウト
        </MenuItem>
      </Menu>
    </div>
  );
}
