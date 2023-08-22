import { useEffect } from 'react';

import { useTelegram } from './hooks/useTelegram';

import { Routes, Route } from 'react-router-dom';

import SharedLayout from './components/SharedLayout/SharedLayout';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    // <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<ProductList />} />
        <Route path="form" element={<Form />} />
      </Route>
    </Routes>
    // </Suspense>
  );
}

export default App;
