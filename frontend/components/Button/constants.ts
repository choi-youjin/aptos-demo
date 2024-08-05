import { WaitingSymbolColor } from '../WaitingSymbol/types';
import type { ButtonColor, ButtonSize, ButtonStatus, ButtonType } from './types';

export const BUTTON_COLOR_CLASS_DICT: Record<ButtonType, Record<ButtonColor | 'disabled', string>> = {
  fill: {
    primary: 'bg-primary text-on_primary border border-solid border-primary',
    on_primary: 'bg-on_primary text-primary border border-solid border-white',
    danger: 'bg-semantic_danger_ground text-semantic_danger',
    caption: 'bg-caption text-ground',
    disabled: 'bg-disabled text-white',
  },
  outline: {
    primary: 'bg-transparent text-primary border border-solid border-primary',
    on_primary: 'bg-transparent text-white border border-solid border-white',
    danger: 'bg-semantic_danger_ground text-semantic_danger border-[0.25px] border-solid border-semantic_danger',
    caption: 'bg-transparent text-caption border border-solid border-caption',
    disabled: 'bg-transparent text-disabled border border-solid border-disabled',
  },
  text: {
    primary: 'bg-transparent text-primary',
    on_primary: 'bg-transparent text-white',
    danger: 'bg-transparent text-semantic_danger',
    caption: 'bg-transparent text-caption',
    disabled: 'bg-transparent text-disabled',
  },
};

export const BUTTON_WAITING_SYMBOL_COLOR_DICT: Record<ButtonType, Record<ButtonColor, WaitingSymbolColor>> = {
  fill: {
    primary: 'on_primary',
    on_primary: 'primary',
    danger: 'danger',
    caption: 'caption',
  },
  outline: {
    primary: 'primary',
    on_primary: 'white',
    danger: 'danger',
    caption: 'caption',
  },
  text: {
    primary: 'primary',
    on_primary: 'white',
    danger: 'danger',
    caption: 'caption',
  },
};

export const TEXT_SIZE_CLASS_DICT: Record<ButtonSize, string> = {
  sm: 'Font_button_sm',
  md: 'Font_button_md',
};

export const BUTTON_LABEL_PADDING_CLASS_DICT: Record<ButtonSize, string> = {
  sm: 'px-6 py-3',
  md: 'px-8 py-3.5',
};

export const BUTTON_HEIGHT_CLASS_DICT: Record<ButtonSize, string> = {
  sm: 'h-[2.5rem]',
  md: 'h-[3.25rem]',
};

export const BUTTON_PADDING_CLASS_DICT: Record<ButtonType, Record<ButtonSize, string>> = {
  fill: {
    sm: 'px-1',
    md: 'px-1.5',
  },
  outline: {
    sm: 'px-1',
    md: 'px-1.5',
  },
  text: {
    sm: 'px-1',
    md: 'px-1.5',
  },
};

export const BUTTON_CURSOR_CLASS_DICT: Record<ButtonStatus, string> = {
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed',
  processing: 'cursor-wait',
};
