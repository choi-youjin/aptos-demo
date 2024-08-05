import LOGO_SVG from '@/resources/logos/aptos-logo.svg';

const SCB_LOGO_URI = 'https://www.scb.co.th/CMSPages/GetAzureFile.aspx?path=~%5Ccontent%5Cmedia%5Ccommons%5Cscb-logo-desktop.svg&hash=e93f9ca769012385f2828fb9afaf1b285ad80c19bf453e23286f6f6e84d598ab';

type AppLogoColor = 'light' | 'dark';
type AppLogoSize = 'md' | 'lg';

const LOGO_IMG_URL_DICT: Record<AppLogoColor, string> = {
  dark: SCB_LOGO_URI,
  light: SCB_LOGO_URI,
};

const LOGO_SIZE_CLASS_DICT: Record<AppLogoSize, { className: string }> = {
  md: { className: 'w-24' },
  lg: { className: 'w-24' },
};

type AppLogoProps = {
  color?: AppLogoColor;
  size?: AppLogoSize;
};

const AppLogo = ({ color = 'light', size = 'md' }: AppLogoProps) => {
  const src = LOGO_IMG_URL_DICT[color];
  const imgSize = LOGO_SIZE_CLASS_DICT[size];

  return (
    <img
      src={src}
      alt="App logo"
      className={`grow-0 shrink-0 h-auto bg-transparent ${imgSize.className}`}
    />
  );
};

export default AppLogo;
