import { useState } from 'react';
import ArianaContext from '@/context/ArianaContext';
import { Badge, notification } from 'antd';
import { useContext, useEffect } from 'react';
import axios from 'axios'; 
import { BellOutlined } from '@ant-design/icons';



function NotificationsComponent() {
  const { notifications, token, setToken, setNotifications } = useContext(ArianaContext);
  const [noReadNotifications, setNoReadNotifications] = useState([]);

  useEffect(() => {
    const noReads = notifications.filter((el) =>  !el.read);
    setNoReadNotifications(noReads);
  }, [notifications]);

  useEffect(() => {
    const tkn = localStorage.getItem('authToken');
    if (tkn && !token) {
      setToken(tkn);
      return; 
    }
    axios.get('/api/notifications', {headers: {
      Authorization: `Bearer ${token}`,
    },}).then(result => {
      setNotifications(result.data);
    }).catch(error => {console.log(error);});
  }, [token]);

  const handleNotificationClose = (ntfctn) => {
    axios.put('/api/notifications/update', { read: true, id: ntfctn._id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setNotifications((previousNotifications) =>
          previousNotifications.map((el) =>
            el._id === response.data._id ? { ...el, read: true } : el
          )
        );

      })
      .catch(error => {
        console.error('Erro ao atualizar a notificação', error);
      });
  };
  

  const openNoReadNotifications = () => {
    if (notifications.length) {
      noReadNotifications.forEach((ntfctn) => {
        notification.open({
          message: ntfctn.message,
          onClose: () => handleNotificationClose(ntfctn),
        });
      });
    }
  };

  const openReadNotifications = () => {
    console.log(notifications);
    if (notifications.length) {
      notifications.forEach((ntfctn, i) => {
        if (i >= (notifications.length - 5)) {
          notification.open({
            message: ntfctn.message,
          });
        }
      });
    }
  };

  return (
    <div>
      <Badge count={noReadNotifications.length} dot>
        <BellOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={noReadNotifications && noReadNotifications.length > 0 ? openNoReadNotifications : openReadNotifications} />
      </Badge>
    </div>
  );
}
  
export default NotificationsComponent;
  
