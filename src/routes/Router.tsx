import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PATH, Recipe_PATH, ROOM_PATH, TALK_PATH } from '@/constants/paths';

import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';

import { MainPage } from '@/pages/Main';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { RecipePage } from '@/pages/Recipe';
import { RoomPage } from '@/pages/Room';
import { TalkPage } from '@/pages/Talk';
import { Mypage } from '@/pages/Mypage';
import { RecipeDetailPage } from '@/pages/RecipeDetail';
import { RoomDetailPage } from '@/pages/RoomDetail';
import { TalkDetailPage } from '@/pages/TalkDetail';
import { RecipeWritePage } from '@/pages/RecipeWrite';
import { RoomWritePage } from '@/pages/RoomWrite';
import { KakaoCallbackPage } from '@/pages/KakaoCallback';
import { NotFoundPage } from '@/pages/NotFound';
import { TalkWritePage } from '@/pages/TalkWrite';
import { MyPosts } from '@/pages/MyPosts';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={PATH.root} element={<MainPage />} />

        <Route element={<AuthRouter />}>
          <Route path={PATH.login} element={<LoginPage />} />
          <Route path={PATH.register} element={<RegisterPage />} />
          <Route path={PATH.kakao} element={<KakaoCallbackPage />} />
        </Route>

        <Route path={PATH.receipe} element={<RecipePage />} />
        <Route path={PATH.receipeWrite} element={<RecipeWritePage />} />
        <Route path={Recipe_PATH.detail} element={<RecipeDetailPage />} />

        <Route path={PATH.room} element={<RoomPage />} />
        <Route path={ROOM_PATH.detail} element={<RoomDetailPage />} />

        <Route path={PATH.talk} element={<TalkPage />} />
        <Route path={PATH.talkWrite} element={<TalkWritePage />} />
        <Route path={TALK_PATH.detail} element={<TalkDetailPage />} />

        <Route element={<UserRouter />}>
          <Route path={PATH.roomWrite} element={<RoomWritePage />} />
          <Route path={PATH.mypage} element={<Mypage />} />
          <Route path={PATH.myPosts} element={<MyPosts />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
