import { Store } from 'react-notifications-component';

const showMessageImpl = (message) =>
  Store.addNotification({
    ...message,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismissable: { click: true },
  });

const showMessage = (messages) => {
  if (Array.isArray(messages)) {
    return messages.forEach((message) => showMessageImpl(message));
  }

  showMessageImpl(messages);
};

export default showMessage;
