import { aptosClient } from "@/utils/aptosClient";
import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useCallback } from "react";
import useProcessing from "@/hooks/useProcessing";
import { formatNumber } from "@/utils/number";
import { useToast } from "@/components/ui/use-toast";
import { CommittedTransactionResponse } from "@aptos-labs/ts-sdk";

const useSendFungibleAsset = () => {
    const { toast } = useToast();

    const toastSuccess = useCallback((receiverAddress: string, amount: number) => {
        toast({
            variant: "default",
            title: "Success",
            description: `Sent ${formatNumber(amount)} to ${receiverAddress}`,
          });
    }, [toast]);

    const toastError = useCallback(({ response, error }: { response?: CommittedTransactionResponse; error?: unknown }) => {
        toast({
            variant: "destructive",
            title: "Error",
            description: response ? `Something went wrong with transaction ${response.hash}` : `${error}`,
          });
    }, [toast]);

    const { startProcessing, stopProcessing, isProcessing } = useProcessing<boolean>();

    const { account, signAndSubmitTransaction } = useWallet();

    const sendFungibleAsset = useCallback(async (receiverAddress: string, assetType: string, onChainAmount: number) => {
        if (!account) return;

        try {
            // test receiver: 0x3dbd1bf64d923e0df4393e5a656c1463b6d1cc642c9035aea6c25393c440fe79
            const txData: InputTransactionData = {
                sender: account.address,
                data: {
                    function: "0x1::aptos_account::transfer_coins",
                    typeArguments: [assetType],
                    functionArguments: [receiverAddress, onChainAmount],
                },
            };

            console.log('txData', txData);

            startProcessing(true);
    
            const response = await signAndSubmitTransaction(txData);

            const committedTransactionResponse = await aptosClient().waitForTransaction({
                transactionHash: response.hash,
              });

              stopProcessing();

              if (committedTransactionResponse.success) {
                toastSuccess(receiverAddress, onChainAmount);
              } else {
                toastError({ response: committedTransactionResponse });
              }
        } catch(error) {
            stopProcessing();
            toastError({ error });
            console.log('sendFungibleAsset error', error);
        }

    }, [account, signAndSubmitTransaction, toastSuccess, toastError]);


    return {
        sendFungibleAsset,
        isProcessing,
    };
}

export default useSendFungibleAsset;