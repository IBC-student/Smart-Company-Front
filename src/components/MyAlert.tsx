import React, { useEffect } from 'react';
import { State, AlertInfo } from 'storetypes';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

export const MyAlert: React.VFC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: State) => state.Alert_info.isOpen);
  const message: string = useSelector(
    (state: State) => state.Alert_info.message
  );
  const close: AlertInfo = { message: '', isOpen: false };
  const handleClose = () => {
    dispatch({ type: 'SET_ALERTINFO', payload: close });
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        onClose={handleClose}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </div>
  );
};
