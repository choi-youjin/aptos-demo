'use client';

import { type MouseEventHandler, type ReactNode, useMemo, useCallback, useRef } from 'react';
import { type OverlayBackdropColor } from './styles';
import useOverlayBackdropClassNames from './useOverlayBackdropClassNames';
import useScrollLock from '@/hooks/useScrollLock';

type OverlayBackdropProps = {
  children?: ReactNode;
  color?: OverlayBackdropColor;
  isOpen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const OverlayBackdrop = ({ children, color = 'glass', isOpen = false, onClick, className = '' }: OverlayBackdropProps) => {
  const defaultClassName = useOverlayBackdropClassNames(color, isOpen);
  const props = useMemo(
    () => ({
      'aria-hidden': !isOpen,
      className: `${defaultClassName} ${className}`,
    }),
    [isOpen, defaultClassName, className],
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.target !== event.currentTarget) return;
      onClick?.(event);
    },
    [onClick],
  );

  // lock scroll when overlay is open
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen, buttonRef?.current ?? divRef?.current);

  return onClick ? (
    <button type="button" ref={buttonRef} {...props} onClick={handleClick}>
      {children}
    </button>
  ) : (
    <div ref={divRef} {...props}>
      {children}
    </div>
  );
};

export default OverlayBackdrop;
