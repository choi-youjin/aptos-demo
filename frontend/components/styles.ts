export type TextColor = 'primary' | 'on_primary' | 'on_ground' | 'body' | 'caption';

export const TEXT_COLOR_CLASS_DICT: Record<TextColor, string> = {
  primary: 'text-primary',
  on_primary: 'text-on_primary',
  on_ground: 'text-body',
  body: 'text-body',
  caption: 'text-caption',
};

export type Status = 'info' | 'success' | 'warning' | 'danger';

export const STATUS_COLOR_CLASS_DICT: Record<Status, { text: string; background: string }> = {
  info: { text: 'text-semantic_info_ground', background: 'bg-semantic_info' },
  success: { text: 'text-semantic_success_ground', background: 'bg-semantic_success' },
  warning: { text: 'text-semantic_warning_ground', background: 'bg-semantic_warning' },
  danger: { text: 'text-semantic_danger_ground', background: 'bg-semantic_danger' },
};
