import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useCallback, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useBalances from "@/hooks/useBalances";
import WaitingSymbol from "@/components/WaitingSymbol";
import Table from "@/components/Table";
import { TableRowData } from "@/components/Table/types";
import BigNumber from "bignumber.js";
import NumberText from "@/components/NumberText";
import { formatNumber } from "@/utils/number";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import CoinLogo from "@/components/CoinLogo";
import useModal from "@/hooks/useModal";
import SendFungibleAssetModal from "@/components/modals/SendFungibleAssetModal";
import { FungibleAssetBalanceWithMetadata } from "@/types/aptos";

type BalanceTableRow = TableRowData & {
  token: JSX.Element;
  tokenName: string;
  amount: JSX.Element;
  amountNumber: BigNumber;
  sendButton: JSX.Element;
};

export function Mint() {
  const queryClient = useQueryClient();

  const { account, isLoading } = useWallet();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [account, queryClient]);

  const balances = useBalances();

  const sendFungibleAssetModal = useModal();

  const openSendFungibleAssetModal = useCallback(async (balanceWithMetadata: FungibleAssetBalanceWithMetadata) => {
    await sendFungibleAssetModal.open(props => <SendFungibleAssetModal {...props} balanceWithMetadata={balanceWithMetadata} />);
  }, [sendFungibleAssetModal]);

  const rows = useMemo<readonly BalanceTableRow[]>(() => {
    return balances?.map(balance => {
      const id = balance.asset_type;

      const symbol = balance.metadata?.symbol ?? 'Unknown';
      const name = balance.metadata?.name ?? 'Unknown';
      const logoURI = balance.metadata?.icon_uri ?? undefined;

      const tokenName = name;
      const token = (
        <div className="inline-flex items-center gap-x-3">
          <CoinLogo assetType={balance.asset_type} logoURI={logoURI} />
          <div className="inline-flex items-center gap-x-2">
            <span className="Font_body_md">{name}</span>
            <span className="Font_caption_sm text-caption">{symbol}</span>
          </div>
        </div>
      );

      const onChainAmount = BigNumber(balance.amount);
      const decimals = balance.metadata?.decimals ?? 0;
      const amountNumber = onChainAmount.shiftedBy(-decimals);
      const amount = <NumberText formattedNumber={formatNumber(amountNumber, decimals)} />;

      const sendButton = <Button size="sm" label="Send" onClick={() => openSendFungibleAssetModal(balance)} />;

      return {
        id,
        token,
        tokenName,
        amount,
        amountNumber,
        sendButton,
        // ...balance,
      }
    }) ?? [];
  }, [balances, openSendFungibleAssetModal]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
       <WaitingSymbol />
      </div>
    );
  }

  return (
        <main className="flex flex-col items-stretch gap-y-10 pt-app_header_height">

          <article className="w-full max-w-app_container mx-auto mt-app_header_height">
            <Heading tagName="h3" className="mb-4" color="caption">Balance</Heading>

            <Card>
          <Table<BalanceTableRow> 
            rows={rows}
            dSortValue="tokenName"
            dIsAsc={true}
            fields={[
              {
                label: "Token",
                value: 'token',
                type: 'jsx',
                sortType: 'string',
                sortValue: 'tokenName',
                widthRatio: 20,
              },
              {
                label: "Balance",
                value: 'amount',
                type: 'jsx',
                sortType: 'bignumber',
                sortValue: 'amountNumber',
                align: 'right',
              },
              {
                label: "Send",
                value: 'sendButton',
                type: 'jsx',
                sortDisabled: true,
                align: 'center',
                widthRatio: 14,
              },
            ]}
          />
          </Card>
          </article>

          {/* <HeroSection /> */}
          {/* <StatsSection /> */}
        </main>

  );
}
