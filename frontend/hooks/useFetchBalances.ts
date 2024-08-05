import { useQuery } from "@tanstack/react-query";
import { aptosClient } from "@/utils/aptosClient";
import { FungibleAssetBalance } from "@/types/aptos";

const useFetchBalances = (refetchInterval: number | null, { accountAddress }: { accountAddress: string | undefined }) => {
  return useQuery<readonly FungibleAssetBalance[] | undefined>({
    queryKey: ["balance", accountAddress ?? 'unknown'],
    enabled: refetchInterval !== null,
    refetchInterval: refetchInterval ?? 0,
    queryFn: async () => {
      if (!accountAddress) return undefined;

      try {
        const data = await aptosClient().getCurrentFungibleAssetBalances({ options: { where: { owner_address: { _eq: accountAddress } } } });
        return data;
      } catch (error) {
        console.error('Error fetching balances', error);
      }
    },
  });
}

export default useFetchBalances;
