import React from 'react';
import { AiOutlineAppstoreAdd, AiOutlineLink, AiOutlineLoading3Quarters, AiOutlineSetting } from 'react-icons/ai';
import {
  BsBellFill,
  BsBox,
  BsCheckCircleFill,
  BsEyeFill,
  BsEyeSlashFill,
  BsFillFolderFill,
  BsInfoCircle,
  BsPencilSquare,
  BsPlusLg,
  BsQuestion,
  BsSearch,
  BsWalletFill,
  BsDownload,
  BsFillSendFill,
  BsChevronCompactUp,
  BsChevronUp,
  BsChevronDown,
  BsCircle,
} from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { LiaFileContractSolid } from 'react-icons/lia';
import {
  MdArrowBack,
  MdArrowDownward,
  MdArrowForward,
  MdArrowUpward,
  MdAutoGraph,
  MdCheck,
  MdContentCopy,
  MdDangerous,
  MdDelete,
  MdEmail,
  MdExpandLess,
  MdExpandMore,
  MdKeyboardDoubleArrowLeft,
  MdNorthEast,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlinePowerSettingsNew,
  MdOutlineSpaceDashboard,
  MdWarning,
} from 'react-icons/md';
import { PiIntersectThree, PiTreeStructure } from 'react-icons/pi';
import { RiApps2Line } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { CgMoreVertical, CgRadioChecked, CgRadioCheck } from 'react-icons/cg';
import { FaRankingStar } from 'react-icons/fa6';
import { LuArrowBigDown, LuArrowBigUp, LuTrash } from 'react-icons/lu';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconType =
  | 'close'
  | 'copy'
  | 'link'
  | 'copylink'
  | 'checked'
  | 'unchecked'
  | 'arrow_up'
  | 'arrow_down'
  | 'arrow_forward'
  | 'arrow_back'
  | 'arrow_chevron_right'
  | 'arrow_chevron_left'
  | 'arrow_chevron_up'
  | 'arrow_chevron_down'
  | 'external_link'
  | 'expand_more'
  | 'expand_less'
  | 'wallet'
  | 'success'
  | 'close_eye'
  | 'open_eye'
  | 'plus'
  | 'bell'
  | 'logout'
  | 'info'
  | 'danger'
  | 'warning'
  | 'edit'
  | 'box'
  | 'processing'
  | 'check'
  | 'dashboard'
  | 'apps'
  | 'structure'
  | 'contract'
  | 'stake'
  | 'people'
  | 'setting'
  | 'switch'
  | 'asset'
  | 'intersect'
  | 'delete'
  | 'search'
  | 'refresh'
  | 'question'
  | 'radio_checked'
  | 'radio_unchecked'
  | 'email'
  | 'folder'
  | 'download'
  | 'send'
  | 'more'
  | 'doubleArrowLeft'
  | 'rank'
  | 'trend_up'
  | 'trend_down'
  | 'trash'
  | 'more'
  | 'circle';

const ICON_SIZE_CLASS_DICT: Record<IconSize, string> = {
  xs: 'w-2 h-2',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-10 h-10',
};

const ICON_DICT: Record<IconType, React.ElementType> = {
  close: IoMdClose,
  copy: MdContentCopy,
  link: AiOutlineLink,
  copylink: AiOutlineLink,
  checked: ImCheckboxChecked,
  unchecked: ImCheckboxUnchecked,
  arrow_up: MdArrowUpward,
  arrow_down: MdArrowDownward,
  arrow_forward: MdArrowForward,
  arrow_back: MdArrowBack,
  arrow_chevron_right: MdOutlineChevronRight,
  arrow_chevron_left: MdOutlineChevronLeft,
  arrow_chevron_up: BsChevronUp,
  arrow_chevron_down: BsChevronDown,
  external_link: MdNorthEast,
  expand_more: MdExpandMore,
  expand_less: MdExpandLess,
  wallet: BsWalletFill,
  success: BsCheckCircleFill,
  close_eye: BsEyeSlashFill,
  open_eye: BsEyeFill,
  plus: BsPlusLg,
  bell: BsBellFill,
  logout: MdOutlinePowerSettingsNew,
  info: BsInfoCircle,
  danger: MdDangerous,
  warning: MdWarning,
  edit: BsPencilSquare,
  box: BsBox,
  processing: AiOutlineLoading3Quarters,
  check: MdCheck,
  dashboard: MdOutlineSpaceDashboard,
  apps: AiOutlineAppstoreAdd,
  structure: PiTreeStructure,
  contract: LiaFileContractSolid,
  stake: MdAutoGraph,
  people: GoPeople,
  setting: AiOutlineSetting,
  switch: HiOutlineSwitchVertical,
  asset: RiApps2Line,
  intersect: PiIntersectThree,
  delete: MdDelete,
  search: BsSearch,
  download: BsDownload,
  refresh: FiRefreshCw,
  question: BsQuestion,
  radio_checked: CgRadioChecked,
  radio_unchecked: CgRadioCheck,
  email: MdEmail,
  folder: BsFillFolderFill,
  send: BsFillSendFill,
  more: CgMoreVertical,
  doubleArrowLeft: MdKeyboardDoubleArrowLeft,
  rank: FaRankingStar,
  trend_up: LuArrowBigUp,
  trend_down: LuArrowBigDown,
  trash: LuTrash,
  circle: BsCircle,
};
// ImCheckboxUnchecked

type IconProps = {
  type: IconType;
  size?: IconSize;
  className?: string;
};

const Icon = ({ type, size = 'md', className = '' }: IconProps) => {
  const IconComponent = ICON_DICT[type];
  const sizeClassName = ICON_SIZE_CLASS_DICT[size];

  return (
    // <IconContext.Provider
    //   value={{
    //     className: '',
    //   }}
    // >
    //   <IconComponent className={`${sizeClassName} ${className}`} />
    // </IconContext.Provider>
    <IconComponent className={`grow-0 shrink-0 ${sizeClassName} ${className}`} />
  );
};

export default Icon;
