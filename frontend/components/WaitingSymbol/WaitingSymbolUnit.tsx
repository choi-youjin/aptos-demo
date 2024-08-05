// import AppSymbolSVG from '@/components/svgs/AppSymbolSVG';
import type { WaitingSymbolColor } from './types';

const COLOR_CLASS_DICT: Record<WaitingSymbolColor, string> = {
  white: 'bg-white',
  primary: 'bg-primary',
  on_primary: 'bg-on_primary',
  danger: 'bg-semantic_danger',
  caption: 'bg-caption',
};

const WaitingSymbolUnit = ({ color, className }: { color: WaitingSymbolColor; className?: string }) => {
  const colorClassName = COLOR_CLASS_DICT[color];
  return <div className={`w-2.5 h-2.5 rounded-full overflow-hidden ${colorClassName} ${className}`}></div>;
};

export default WaitingSymbolUnit;
