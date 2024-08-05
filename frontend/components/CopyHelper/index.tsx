'use client';

import { ButtonHTMLAttributes } from 'react';
import Icon from '@/components/Icon';
import { useCopyClipboard } from './hook';

interface BaseProps {
  toCopy: string;
  iconPosition?: 'left' | 'right';
}

type CopyHelperProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

const CopyHelper = ({ children, toCopy, iconPosition = 'right', className = '' }: CopyHelperProps) => {
  const [isCopied, copy] = useCopyClipboard();

  const CopiedIcon = <Icon type="success" />;
  // Transition_500 transition-opacity opacity-40 group-hover/copy:opacity-80
  const CopyIcon = <Icon type="copy" className="" />;

  return (
    <button
      type="button"
      aria-label="copy"
      className={`group/copy relative grow-0 shrink-0 h-min inline-flex justify-start items-center gap-x-2 Transition_500 transition-opacity hover:opacity-60 ${className}`}
      onClick={() => copy(toCopy)}>
      {iconPosition === 'left' && (isCopied ? CopiedIcon : CopyIcon)}
      {children}
      {iconPosition === 'right' && (isCopied ? CopiedIcon : CopyIcon)}
    </button>
  );
};

export default CopyHelper;
