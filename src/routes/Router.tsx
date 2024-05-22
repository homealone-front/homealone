import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PATH } from '@/constants/paths';

import { MainPage } from '@/pages/Main';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={PATH.root} element={<MainPage />} />
        <Route index path={PATH.login} element={<LoginPage />} />
        <Route index path={PATH.register} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
