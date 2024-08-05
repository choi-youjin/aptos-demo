import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AboutAptosConnect, AboutAptosConnectEducationScreen, AnyAptosWallet, AptosPrivacyPolicy, WalletItem, groupAndSortWallets, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, LogOut, User } from "lucide-react";
import Icon from "../Icon";

interface WalletRowProps {
    wallet: AnyAptosWallet;
    onConnect?: () => void;
  }
  
  function WalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
      <WalletItem
        wallet={wallet}
        onConnect={onConnect}
        className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md"
      >
        <div className="flex items-center gap-4">
          <WalletItem.Icon className="h-6 w-6" />
          <WalletItem.Name className="text-base font-normal" />
        </div>
        {/* {isInstallRequired(wallet) ? (
          <Button label="Install" />
        ) : (
          <WalletItem.ConnectButton asChild>
            <Button label="Connect" />
          </WalletItem.ConnectButton>
        )} */}
      </WalletItem>
    );
  }

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
      <WalletItem wallet={wallet} onConnect={onConnect}>
        <WalletItem.ConnectButton asChild className="pl-4 pr-6 py-2 rounded-full border border-solid border-primary Transition_500 transition-colors hover:bg-primary hover:text-on_primary">
          <button type="button" className="w-full flex items-center gap-4">
            <WalletItem.Icon className="h-5 w-5" />
            <WalletItem.Name className="text-base font-normal" />
          </button>
        </WalletItem.ConnectButton>
      </WalletItem>
    );
  }
  
  function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
    return (
      <>
        <DialogHeader className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
          {/* <Button label="Go" onClick={screen.cancel} /> */}
          <DialogTitle className="leading-snug text-base text-center">About Aptos Connect</DialogTitle>
        </DialogHeader>
  
        <div className="flex h-[162px] pb-3 items-end justify-center">
          <screen.Graphic />
        </div>
        <div className="flex flex-col gap-2 text-center pb-4">
          <screen.Title className="text-xl" />
          <screen.Description className="text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
        </div>
  
        <div className="grid grid-cols-3 items-center">
          {/* <Button leadingIcon="arrow_back" label="Back" labelHidden onClick={screen.back} className="justify-self-start" /> */}
          <div className="flex items-center gap-2 place-self-center">
            {screen.screenIndicators.map((ScreenIndicator, i) => (
              <ScreenIndicator key={i} className="py-4">
                <div className="h-0.5 w-6 transition-colors bg-muted [[data-active]>&]:bg-foreground" />
              </ScreenIndicator>
            ))}
          </div>
          {/* <Button label= {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"} onClick={screen.next} className="gap-2 justify-self-end" /> */}
        </div>
      </>
    );
  }

interface ConnectWalletDialogProps {
    close: () => void;
  }
  
  function ConnectWalletDialog({ close }: ConnectWalletDialogProps) {
    const { wallets = [] } = useWallet();
  
    const location = useLocation();
  
    const isPublicMintPage = location.pathname !== "/create-asset" && location.pathname !== "/my-assets";
  
    const { aptosConnectWallets, availableWallets, installableWallets } = groupAndSortWallets(wallets);
  
    const hasAptosConnectWallets = !!aptosConnectWallets.length;
  
    return (
      <DialogContent className="max-h-screen overflow-auto bg-ground rounded-card_md border border-solid border-line">
        <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
          {/* AptosConnect does not support file uploads, so we only show it on the public mint page when people want to mint an asset */}
          {isPublicMintPage ? (
            <>
              <DialogHeader className="flex flex-col items-center">
                <DialogTitle className="flex flex-col text-center leading-snug">
                  <span>Log in or sign up</span>
                  <span>with Social + Aptos Connect</span>
                </DialogTitle>
              </DialogHeader>
              {hasAptosConnectWallets && (
                <div className="flex flex-col items-center gap-2 pt-3">
                  {aptosConnectWallets.map((wallet) => (
                    <AptosConnectWalletRow key={wallet.name} wallet={wallet} onConnect={close} />
                  ))}
                  <p className="flex gap-1 justify-center items-center text-muted-foreground Font_caption_xs text-caption">
                    Learn more about{" "}
                    <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center Font_body_xs Transition_500 transition-opacity hover:opacity-70">
                      Aptos Connect <Icon size="sm" type="arrow_forward" />
                    </AboutAptosConnect.Trigger>
                  </p>
                  <AptosPrivacyPolicy className="flex flex-col items-center py-1 Font_caption_xs text-caption">
                    <p className="">
                      <AptosPrivacyPolicy.Disclaimer />{" "}
                      <AptosPrivacyPolicy.Link className="Transition_500 transition-opacity hover:opacity-70 underline underline-offset-4" />
                      <span className="text-muted-foreground">.</span>
                    </p>
                    <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-muted-foreground" />
                  </AptosPrivacyPolicy>
                  {/* <div className="flex items-center gap-3 pt-4 Font_body_sm">
                    <div className="h-px w-full bg-secondary" />
                    Or
                    <div className="h-px w-full bg-secondary" />
                  </div> */}
                </div>
              )}
            </>
          ) : (
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle className="flex flex-col text-center leading-snug">
                <span>Connect a Wallet</span>
              </DialogTitle>
            </DialogHeader>
          )}
          {/* <div className="flex flex-col gap-3 pt-3">
            {availableWallets.map((wallet) => (
              <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
            ))}
            {!!installableWallets.length && (
              <Collapsible className="flex flex-col gap-3">
                <CollapsibleTrigger asChild>
                  <Button type="outline" leadingIcon="expand_more" label="More wallets" />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-3">
                  {installableWallets.map((wallet) => (
                    <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div> */}
        </AboutAptosConnect>
      </DialogContent>
    );
  }

  export default ConnectWalletDialog;