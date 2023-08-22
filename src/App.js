import { useEffect } from 'react';

const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      hello human
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
