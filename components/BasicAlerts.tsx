import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type MessageProp = {
  message: string;
  messageType: 'error' | 'info' | 'success' | 'warning'
}
// "error", "warning", "info", "success"
export default function BasicAlerts(props : MessageProp) {
  const { message, messageType } = props;
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={messageType}>{message}</Alert>
    </Stack>
  );
}