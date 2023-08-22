const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    queryID: tg.initDataUnsafe?.query_Id,
    onClose,
    onToggleButton,
  };
}
