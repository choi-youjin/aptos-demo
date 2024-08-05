import {
  APTOS_CONNECT_ACCOUNT_URL,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { useCallback, useState } from "react";
import Button from "@/components/Button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ConnectWalletDialog from "@/components/ConnectWalletDialog";
import CopyHelper from "./CopyHelper";
import Icon from "./Icon";
import useModal from "@/hooks/useModal";
import ConnectWalletModal from "./modals/ConnectWalletModal";

export function WalletSelector() {
  const { account, connected, disconnect, wallet } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const connectWalletModal = useModal();

  const openConnectWalletModal = useCallback(async () => {
    await connectWalletModal.open(props => <ConnectWalletModal {...props} />)
  }, [connectWalletModal]);

  return account && connected ? (
    <div className="flex items-center gap-x-4">
      <CopyHelper toCopy={account.address} className="Font_body_sm rounded-full px-2 py-1">
        {account.ansName ?? truncateAddress(account.address) ?? "Unknown"}
      </CopyHelper>

      <a href={APTOS_CONNECT_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 Font_caption_xs text-caption Transition_500 transition-all hover:opacity-70 hover:text-link">
        <span>Dashboard</span>
        <Icon type="external_link" size="sm" />
      </a>     

      <button type="button" title="Disconnect" className="rounded-full px-1 py-1 bg-transparent Transition_500 transition-colors hover:bg-semantic_danger_backdrop" onClick={disconnect}>
        <Icon type="logout" className="text-semantic_danger rounded-[inherit]" />
      </button>
    </div>
  ) : (
    <Button label="Connect" onClick={openConnectWalletModal} />
    // <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    //   <DialogTrigger>
    //     <Button label="Connect" />
    //   </DialogTrigger>
    //   <ConnectWalletDialog close={closeDialog} />
    // </Dialog>
  );
}






