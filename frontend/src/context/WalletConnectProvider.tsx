import React, { createContext, useContext } from "react";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const projectId = "da57a51fa051ac06a34327762cd6cc4f"; // Your WalletConnect Project ID

const providerMetadata = {
  name: "Crypto Portfolio App",
  description: "Connect your wallet to track your portfolio",
  url: "https://yourapp.com",
  icons: ["https://yourapp.com/logo.png"],
  redirect: {
    native: "yourapp://",
    universal: "https://yourapp.com",
  },
};

const sessionParams = {
  namespaces: {
    eip155: {
      methods: ["eth_sendTransaction", "personal_sign"],
      chains: ["eip155:1"], // Ethereum Mainnet
      events: ["accountsChanged", "chainChanged"],
      rpcMap: {
        "eip155:1": `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
      },
    },
  },
};

// Create the WalletConnect Context
const WalletConnectContext = createContext<any>(null);

export const WalletConnectProvider = ({ children }: any) => {
  const { open, close, isConnected, address } = useWalletConnectModal();

  const connectWallet = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await close();
    } catch (error) {
      console.error("Wallet disconnection error:", error);
    }
  };

  return (
    <WalletConnectContext.Provider
      value={{ isConnected, connectWallet, disconnectWallet, address }}>
      {children}
      {/* WalletConnect Modal must be inside the Provider */}
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </WalletConnectContext.Provider>
  );
};

// Custom hook to use WalletConnect
export const useWallet = () => {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletConnectProvider");
  }
  return context;
};
