import { Link } from "react-router-dom";
import { WalletSelector } from "@/components/WalletSelector";
import AppLogo from "@/components/AppLogo";
import useAppHeaderClassName from "./useAppHeaderClassName";

interface AppHeaderProps {
  className?: string;
}

const AppHeader = ({ className = '' }: AppHeaderProps) => {
  const defaultClassName = useAppHeaderClassName();

  // const { data } = useGetAssetData();
  // const location = useLocation();

  // const isRoot = location.pathname === "/";

  // const title = useMemo(() => {
  //   if (!isRoot) return "Fungible Asset Launchpad";
  //   return data?.asset.symbol.toUpperCase() ?? config.defaultAsset?.name ?? "Fungible Asset Launchpad";
  // }, [isRoot, data?.asset]);

  return (
    <header className={`${defaultClassName} ${className}`}>
      <Link to="/"><AppLogo /></Link>

      <div className="flex gap-2 items-center flex-wrap">
        <WalletSelector />
      </div>
    </header>
  );
}

export default AppHeader;
