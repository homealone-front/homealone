import { useState } from 'react';

export interface UseDisclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * 토글
 */
export const useDisclosure = (): UseDisclosure => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};
