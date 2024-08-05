import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useMemo } from "react";
import useFungibleAssetMetadata from "@/hooks/useFungibleAssetMetadata";
import { FungibleAssetBalanceWithMetadata } from "@/types/aptos";
import useFetchBalances from "./useFetchBalances";

const useBalances = () => {
  const { account } = useWallet();

  const { data: balances } = useFetchBalances(6000, { accountAddress: account?.address });

  const assetTypes = useMemo(() => balances?.map((balance) => balance.asset_type) ?? [], [balances]);

  const metadata = useFungibleAssetMetadata(assetTypes);

  const balancesWithMetadata = useMemo<readonly FungibleAssetBalanceWithMetadata[] | undefined>(() => balances?.map(balance => ({ ...balance, metadata: metadata[balance.asset_type] })), [balances, metadata]);

  return balancesWithMetadata;
}

export default useBalances;