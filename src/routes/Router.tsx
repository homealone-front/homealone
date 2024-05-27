import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PATH } from '@/constants/paths';

import AuthRouter from './AuthRouter';

import { MainPage } from '@/pages/Main';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={PATH.root} element={<MainPage />} />

        <Route element={<AuthRouter />}>
          <Route path={PATH.login} element={<LoginPage />} />
          <Route path={PATH.register} element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
