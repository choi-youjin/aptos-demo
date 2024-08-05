import { ModalElement } from "@/hooks/useModal/types";
import OverlayBackdrop from "@/components/OverlayBackdrop";
import Card from "../Card";
import Heading from "../Heading";
import { useCallback, useMemo, useState } from "react";
import { FungibleAssetBalanceWithMetadata } from "@/types/aptos";
import NumberText from "../NumberText";
import { formatNumber } from "@/utils/number";
import BigNumber from "bignumber.js";
import useSendFungibleAsset from "@/hooks/useSendFungibleAsset";
import Button, { ButtonProps } from "../Button";
import { ButtonStatus } from "../Button/types";
import AlertBox, { AlertBoxProps } from "../AlertBox";
import useFetchBalances from "@/hooks/useFetchBalances";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

type SendFungibleAssetModalProps = Parameters<ModalElement>[0] & {
    balanceWithMetadata: FungibleAssetBalanceWithMetadata;
}

const SendFungibleAssetModal = ({ balanceWithMetadata, isOpen, onClose }: SendFungibleAssetModalProps) => {
    const { account } = useWallet();

    const { data: balances } = useFetchBalances(6000, { accountAddress: account?.address });
  
    const { asset_type, amount: initialOnChainBalance, metadata } = balanceWithMetadata;

    const onChainBalance = useMemo<number>(() => {
        const balance = balances?.find(balance => balance.asset_type === asset_type);
        return balance?.amount ?? initialOnChainBalance;
    }, [balances, asset_type, initialOnChainBalance]);

    const decimals = useMemo(() => metadata?.decimals ?? 0, [metadata]);

    const [receiverAddress, setReceiverAddress] = useState<string>('');
    const [sendAmount, setSendAmount] = useState<string>('');

    const { formattedBalance, symbol } = useMemo(() => {
        const formattedBalance = formatNumber(BigNumber(onChainBalance).shiftedBy(-decimals), decimals);
        const symbol = metadata?.symbol ?? 'Unknown';

        return { formattedBalance, symbol };
    }, [onChainBalance, metadata, decimals]);

  const { sendFungibleAsset, isProcessing } = useSendFungibleAsset();

  const buttonProps = useMemo<ButtonProps>(() => {
    const isEmptyReceiver = receiverAddress === '';
    const isEmptyAmount = sendAmount === '' || isNaN(Number(sendAmount));
    const isInsufficientBalance = BigNumber(sendAmount).shiftedBy(decimals).gt(onChainBalance);

    const label = isEmptyReceiver ? 'Enter address' : isEmptyAmount ? 'Enter amount' : isInsufficientBalance ? "Insufficient balance" : "Send";
    const status: ButtonStatus = isEmptyReceiver || isEmptyAmount || isInsufficientBalance ? 'disabled' : isProcessing ? 'processing' : 'enabled';

    return {
        label,
        status,
    }
  }, [isProcessing, sendAmount, decimals, onChainBalance]);

  const alertBoxProps = useMemo<AlertBoxProps | undefined>(() => {
    if (asset_type !== '0x1::aptos_coin::AptosCoin') return undefined;

    const leftoverBalance = BigNumber(onChainBalance).shiftedBy(-decimals).minus(sendAmount);
    const isWarned = leftoverBalance.gte(0) && leftoverBalance.lte(0.001);

    if (isWarned) {
        return { status: 'warning', text: 'You are about to send almost all of your balance. You should leave some to pay transaction fee in the future.' };
    }

    return undefined
  }, [asset_type, sendAmount, onChainBalance]);

  const onClickSend = useCallback(async () => {
    const onChainAmount = BigNumber(sendAmount).shiftedBy(decimals).toNumber();
    await sendFungibleAsset(receiverAddress, asset_type, onChainAmount);
  }, [sendFungibleAsset, sendAmount, decimals, receiverAddress, asset_type]);
    
    return (
        <OverlayBackdrop isOpen={isOpen} className="flex items-center justify-center" onClick={onClose}>
            <Card className="w-modal_width_md px-card_padding_x py-card_padding_y bg-ground cursor-default">
                <Heading tagName="h4" className="mb-10">Send {metadata?.name ?? 'fungible asset'}</Heading>

                <div className="flex flex-col items-stretch gap-y-5 mb-10">
                    <div className="border border-solid border-line rounded-full px-4 py-2">
                        <input className="w-full" type="text" placeholder="Receiver's Aptos address" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-stretch gap-y-2">
                        <div className="border border-solid border-line rounded-full px-4 py-2">
                            <input className="w-full" type="number" placeholder="Amount" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} />
                        </div>
                        
                        <div className="flex justify-end">
                            <div className="inline-flex items-baseline gap-x-2 Font_caption_xs text-caption">Available balance: <NumberText size="sm" formattedNumber={formattedBalance} unit={symbol} /></div>
                        </div>
                    </div>
                </div>

                {alertBoxProps && <AlertBox {...alertBoxProps} className="animate-fade_in_x mb-10" />}

                <Button {...buttonProps} onClick={onClickSend}/>
            </Card>
        </OverlayBackdrop>
    )
}

export default SendFungibleAssetModal;