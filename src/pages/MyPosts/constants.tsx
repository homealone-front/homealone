import React from 'react';
import { TalkList } from './components/TalkList';
import { RoomList } from './components/RoomList';
import { RecipeList } from './components/RecipeList';
import { CommentList } from './components/CommentList';

export interface NavTabType {
  name: string;
  imageUrl: string;
  content: React.ReactNode;
}

export const NAV_TABS = {
  recipe: { name: '레시피', imageUrl: '/icons/recipe_none_icon.svg', content: <RecipeList /> },
  room: { name: '방자랑', imageUrl: '/icons/room_none_icon.svg', content: <RoomList /> },
  talk: { name: '혼잣말', imageUrl: '/icons/talk_none_icon.svg', content: <TalkList /> },
  comment: { name: '댓글', imageUrl: '/icons/comment_none_icon.svg', content: <CommentList /> },
};
