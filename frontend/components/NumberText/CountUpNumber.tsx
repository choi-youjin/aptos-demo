import { getDecimalSeperator, getIntSeperator, unformatNumber } from '@/utils/number';
import { useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

type CountUpNumberProps = {
  formattedNumber: string;
  locale?: string;
  onEnd?: () => void;
  isStarted?: boolean;
  duration?: number;
};

const CountUpNumber = ({
  isStarted = true,
  formattedNumber,
  locale = 'en',
  onEnd,
  duration = 3,
}: CountUpNumberProps) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const decimalSeperator = useMemo<string>(() => getDecimalSeperator(locale), [locale]);
  const intSeperator = useMemo<string>(() => getIntSeperator(locale), [locale]);

  const { number, decimals, prefix } = useMemo<{ number: number; decimals: number; prefix?: string }>(
    () => unformatNumber(formattedNumber, locale),
    [formattedNumber, locale],
  );

  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isStarted && inView) setStart(number);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [isStarted, inView, number, duration]);

  useEffect(() => {
    if (isStarted && inView && number === start) onEnd?.();
  }, [isStarted, inView, number, start, onEnd]);

  return (
    <div ref={ref} className="flex items-baseline w-fit h-fit">
      <CountUp
        delay={0}
        duration={duration}
        start={start}
        end={isStarted && inView ? number : 0}
        decimals={decimals}
        prefix={prefix}
        separator={intSeperator}
        decimal={decimalSeperator}
        //   onEnd={onEnd}
      />
    </div>
  );
};

export default CountUpNumber;
