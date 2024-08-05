import { ReactNode, useState } from 'react';
import Icon, { IconType } from '@/components/Icon';
import { STATUS_COLOR_CLASS_DICT, Status } from '@/components/styles';

export type AlertBoxProps = Readonly<{
  status: Status;
  text: ReactNode;
  className?: string;
  detail?: ReactNode;
}>;

const STATUS_ICON_DICT: Record<Status, IconType> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

const AlertBox = ({ status, text, className = '', detail }: AlertBoxProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const iconType = STATUS_ICON_DICT[status];
  const { text: textClassName, background: backgroundClassName } = STATUS_COLOR_CLASS_DICT[status];

  return (
    <button type="button" className="animate-fade_in" disabled={!detail} onClick={() => setIsDetailOpen(!isDetailOpen)}>
      <div
        className={`flex flex-col items-stretch gap-y-3 p-3 rounded-card_md ${backgroundClassName} ${textClassName} ${className}`}>
        <div className="flex items-start justify-between gap-x-3 px-2">
          <div className="flex items-start gap-x-3 pr-3">
            <div className="w-min h-[1.175rem] flex items-center">
              <Icon type={iconType} size="md" className="mr-2" />
            </div>

            <div className="text-left Font_body_sm">{text}</div>
          </div>

          {detail && <Icon type={isDetailOpen ? 'expand_less' : 'expand_more'} />}
        </div>

        {detail && isDetailOpen && (
          <div className="text-left Font_body_sm text-caption bg-ground p-4 rounded-card_sm break-all">{detail}</div>
        )}
      </div>
    </button>
  );
};

export default AlertBox;
