import { ReactNode, createContext } from 'react';
import type { CloseFunction, OpenFunction, IsOpenGetter } from './types';

const ModalContext = createContext<{
  prevId: number;
  setPrevId: React.Dispatch<React.SetStateAction<number>>;
  open: OpenFunction;
  close: CloseFunction;
  entries: readonly ReactNode[];
  getIsOpen: IsOpenGetter;
} | null>(null);

export default ModalContext;
