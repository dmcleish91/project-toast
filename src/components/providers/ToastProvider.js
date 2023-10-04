import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext(undefined);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createNewToast(message, variant) {
    const toast = {
      id: crypto.randomUUID(),
      message,
      variant,
    };
    setToasts([...toasts, toast]);
  }

  function removeToastById(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  function deleteAllToasts() {
    setToasts([]);
  }

  React.useEffect(() => {
    let timeOut;
    if (toasts.length > 0) {
      timeOut = setTimeout(() => {
        const nextToasts = toasts.slice(0, -1);
        setToasts(nextToasts);
      }, 2500);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [toasts]);

  useEscapeKey(deleteAllToasts);

  const value = {
    toasts,
    setToasts,
    createNewToast,
    removeToastById,
  };
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
export default ToastProvider;
