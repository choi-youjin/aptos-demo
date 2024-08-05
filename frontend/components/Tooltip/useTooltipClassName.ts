import { useMemo } from 'react';
import { TOOLTIP_Z_INDEX_CLASS_DICT, type TooltipLayer, type TooltipType } from './styles';
import { TooltipColor } from './types';

const ANIMATION_CLASS = 'animate-fade_in';
const WIDTH_CLASS = 'max-w-[100vw] md:max-w-[30vw]';
const SHADOW_CLASS = 'Elevation_box_3';
const FONT_CLASS = 'Font_body_sm';
const RADIUS_CLASS = 'rounded-card_sm';
const BORDER_CLASS = 'border border-solid border-line';

const COLOR_CLASSNAME_DICT: Record<TooltipColor, string> = {
  ground: 'bg-ground text-body',
  primary: 'bg-primary_variant_dark text-body',
};

const PADDING_CLASS_DICT: Record<TooltipType, string> = {
  text: 'px-4 py-3',
  any: '',
};

const useTooltipClassName = (type: TooltipType, color: TooltipColor, layer: TooltipLayer) => {
  return useMemo(() => {
    const classNames: { [key: string]: string } = {
      animationClassName: ANIMATION_CLASS,
      gridClassName: WIDTH_CLASS,
      paddingClassName: PADDING_CLASS_DICT[type],
      colorClassName: COLOR_CLASSNAME_DICT[color],
      shadowClassName: SHADOW_CLASS,
      fontClassName: FONT_CLASS,
      radiusClassName: RADIUS_CLASS,
      borderClassName: BORDER_CLASS,
      zIndexClassName: TOOLTIP_Z_INDEX_CLASS_DICT[layer],
    };

    return `Component ${Object.values(classNames).join(' ')}`;
  }, [type, color, layer]);
};

export default useTooltipClassName;
