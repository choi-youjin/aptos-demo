import CountUpNumber from '@/components/NumberText/CountUpNumber';
import { getFormattedNumberParts } from '@/utils/number';
import { useCallback, useMemo, useState } from 'react';

export type NumberTextType = 'normal' | 'small_fractions';
export type NumberTextSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CLASS_DICT: Record<NumberTextSize, { integer: string; fractions: string; unit: string }> = {
  sm: { integer: 'Font_data_xs_num', fractions: 'Font_data_xs_num', unit: 'Font_data_xs' },
  md: { integer: 'Font_data_md_num', fractions: 'Font_data_xs_num', unit: 'Font_data_xs' },
  lg: { integer: 'Font_data_lg_num', fractions: 'Font_data_sm_num', unit: 'Font_data_sm' },
  xl: { integer: 'Font_data_xl_num', fractions: 'Font_data_lg_num', unit: 'Font_data_lg' },
};

type NumberTextProps = {
  type?: NumberTextType;
  formattedNumber?: string;
  unit?: string;
  size?: NumberTextSize;
  locale?: string;
  animate?: boolean;
  className?: string;
};

const NumberText = ({
  type = 'normal',
  formattedNumber,
  unit,
  size = 'md',
  locale,
  animate = false,
  className = '',
}: NumberTextProps) => {
  // styles
  const sizeClassNames = useMemo(() => SIZE_CLASS_DICT[size], [size]);
  const fractionsSizeClassName = useMemo(
    () => (type === 'small_fractions' ? sizeClassNames.fractions : sizeClassNames.integer),
    [type, sizeClassNames],
  );

  // number parts
  const [integer, fractions] = useMemo(
    () => (formattedNumber ? getFormattedNumberParts(formattedNumber, locale ?? 'en') : [null, null]),
    [formattedNumber, locale],
  );

  // animation effect
  const [isFractionsAnimated, setIsFractionsAnimated] = useState<boolean>(false);
  const onFractionsAnimationEnd = useCallback(() => setIsFractionsAnimated(true), []);

  return (
    <span className={`grow-0 shrink-0 flex items-baseline gap-x-1 ${className}`}>
      {integer !== null ? (
        <>
          <span className="flex items-baseline">
            <span className={sizeClassNames.integer}>
              {animate ? (
                <CountUpNumber formattedNumber={integer} locale={locale} isStarted={!fractions || isFractionsAnimated} />
              ) : (
                integer
              )}
            </span>

            {fractions && (
              <span className={`flex items-baseline ${fractionsSizeClassName}`}>
                .
                {animate ? (
                  <CountUpNumber formattedNumber={fractions} locale={locale} duration={0.4} onEnd={onFractionsAnimationEnd} />
                ) : (
                  fractions
                )}
              </span>
            )}
          </span>
          {unit && <span className={sizeClassNames.unit}>{unit}</span>}
        </>
      ) : (
        '-'
      )}
    </span>
  );
};

export default NumberText;
