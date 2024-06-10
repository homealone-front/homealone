import { ReactNode } from 'react';
import { create } from 'zustand';

export interface ModalStoreState {
  isOpen: boolean;
  Modal: ReactNode | ReactNode[];
}

export interface ModalStoreAction {
  setModal: (modal: PropType<ModalStoreState, 'Modal'>) => void;

  onOpen: () => void;
  onClose: () => void;
}

export const useModalStore = create<Partial<ModalStoreState> & ModalStoreAction>()((set) => ({
  isOpen: false,
  Modal: null,

  setModal: (Modal) =>
    set({
      Modal,
    }),

  onOpen: () =>
    set({
      isOpen: true,
    }),

  onClose: () =>
    set({
      isOpen: false,
    }),
}));
