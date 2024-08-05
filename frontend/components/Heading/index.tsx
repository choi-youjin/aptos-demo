import type { ReactNode } from 'react';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
type HeadingColor = 'body' | 'primary' | 'on_primary' | 'on_ground' | 'gradient_on_ground' | 'caption';

const FONT_CLASS_DICT: Record<HeadingTagName, string> = {
  h1: 'Font_display_sm',
  h2: 'Font_display_xs',
  h3: 'Font_title_sm',
  h4: 'Font_title_sm',
  h5: 'Font_title_sm',
};

const TEXT_COLOR_DICT: Record<HeadingColor, string> = {
  body: 'text-body',
  primary: 'text-primary',
  on_primary: 'text-on_primary',
  on_ground: 'text-on_ground',
  gradient_on_ground: 'Text_gradient_on_ground',
  caption: 'text-caption',
};

type HeadingProps = {
  children: ReactNode;
  tagName: HeadingTagName;
  color?: HeadingColor;
  className?: string;
};

const Heading = ({ children, tagName, color = 'body', className = '' }: HeadingProps) => {
  const HeadingElement = tagName;
  const fontClassName = FONT_CLASS_DICT[tagName];
  const colorClassName = TEXT_COLOR_DICT[color];

  return (
    <HeadingElement className={`Component whitespace-normal break-words ${colorClassName} ${fontClassName} ${className}`}>
      {children}
    </HeadingElement>
  );
};

export default Heading;
