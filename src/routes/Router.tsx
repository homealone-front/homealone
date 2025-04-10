import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PATH, RECIPE_PATH, ROOM_PATH, TALK_PATH } from '@/constants/paths';

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
import { NaverCallbackPage } from '@/pages/NaverCallback';
// import { RecipeEditPage } from '@/pages/RecipeEdit';
import { MyPosts } from '@/pages/MyPosts';
import { MyBookmark } from '@/pages/MyBookmark';
import { RecipeEditPage } from '@/pages/RecipeEdit';
import { GoogleCallbackPage } from '@/pages/GoogleCallback';
import { PrivacyPage } from '@/pages/Privacy';

import { Layout, LayoutWithBanner, LayoutWithoutFooter } from '@/layout';

import { ErrorFallback } from '@/components/ErrorFallback';

const Router = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route element={<LayoutWithBanner />}>
            <Route index path={PATH.root} element={<MainPage />} />
          </Route>

          <Route element={<AuthRouter />}>
            <Route element={<LayoutWithoutFooter />}>
              <Route path={PATH.login} element={<LoginPage />} />
              <Route path={PATH.register} element={<RegisterPage />} />
              <Route path={PATH.kakao} element={<KakaoCallbackPage />} />
              <Route path={PATH.naver} element={<NaverCallbackPage />} />
              <Route path={PATH.google} element={<GoogleCallbackPage />} />
            </Route>
          </Route>

          <Route element={<UserRouter />}>
            <Route element={<LayoutWithoutFooter />}>
              <Route path={PATH.recipeWrite} element={<RecipeWritePage />} />
              <Route path={RECIPE_PATH.edit} element={<RecipeEditPage />} />
              <Route path={PATH.talkWrite} element={<TalkWritePage />} />
              <Route path={PATH.roomWrite} element={<RoomWritePage />} />
              <Route path={PATH.mypage} element={<Mypage />} />
              <Route path={PATH.myPosts} element={<MyPosts />} />
              <Route path={PATH.myBookmark} element={<MyBookmark />} />
            </Route>
          </Route>

          <Route element={<LayoutWithoutFooter />}>
            <Route path={RECIPE_PATH.detail} element={<RecipeDetailPage />} />
            <Route path={ROOM_PATH.detail} element={<RoomDetailPage />} />
            <Route path={TALK_PATH.detail} element={<TalkDetailPage />} />
          </Route>

          <Route element={<Layout />}>
            <Route path={PATH.recipe} element={<RecipePage />} />
            <Route path={PATH.room} element={<RoomPage />} />
            <Route path={PATH.talk} element={<TalkPage />} />
            <Route path={PATH.privacy} element={<PrivacyPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Router;
