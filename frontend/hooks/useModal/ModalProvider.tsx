'use client';

import React, { Fragment, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';
import ModalContext from './ModalContext';

const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [prevId, setPrevId] = useState<number>(0);
  const [modalMap, setModalMap] = useState<Map<string, ReactNode>>(new Map());

  const open = useCallback((id: string, element: ReactNode) => {
    setModalMap((modalMap) => {
      const clonedMap = new Map(modalMap);
      clonedMap.set(id, element);
      return clonedMap;
    });
  }, []);

  const close = useCallback((id: string) => {
    setModalMap((modalMap) => {
      const clonedMap = new Map(modalMap);
      clonedMap.delete(id);
      return clonedMap;
    });
  }, []);

  const getIsOpen = useCallback((id: string) => modalMap.has(id), [modalMap]);

  const entries = useMemo(() => [...modalMap.entries()], [modalMap]);

  const context = useMemo(
    () => ({ prevId, setPrevId, open, close, entries, getIsOpen }),
    [prevId, setPrevId, open, close, entries, getIsOpen],
  );

  return (
    <ModalContext.Provider value={context}>
      {children}
      {entries.map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
