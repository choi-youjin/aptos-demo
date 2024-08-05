import XXTHB_LOGO_URI from '@/resources/logos/xxthb-logo.png';

const APT_LOGO_URI = 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/APT.webp';

const COIN_LOGO_URI_MAP:{ [assetType: string]: string } = {
    '0x1::aptos_coin::AptosCoin': APT_LOGO_URI,
    '0x49fa4f5eb65eaca29608df988bb2c7174168710d5fd0817606d69d9ef2d11c1c::stable_coin1::StableCoin1': XXTHB_LOGO_URI,
}

interface CoinLogoProps {
    assetType: string;
    logoURI?: string;
}

const CoinLogo = ({ assetType, logoURI: injectedLogoURI }: CoinLogoProps) => {
    const logoURI = injectedLogoURI ?? COIN_LOGO_URI_MAP[assetType];

    return logoURI ? (
        <img src={logoURI} className="grow-0 shrink-0 w-6 h-6 rounded-full" />
    ) : (
        <div className="grow-0 shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-ground_elevated text-white">?</div>
    );
}

export default CoinLogo;