import React from 'react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div style={{ border: '1px solid red', padding: '10px', margin: '10px 0' }}>
      {notification}
    </div>
  );
};

export default Notification;
