import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useWallet } from "../context/WalletConnectProvider";
import { getEthBalance } from "../utils/wallet";

export default function Home() {
  const { connectWallet, disconnectWallet, isConnected, address } = useWallet();
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      const fetchBalance = async () => {
        setLoading(true);
        const balance = await getEthBalance(address);
        setEthBalance(balance);
        setLoading(false);
      };
      fetchBalance();
    }
  }, [isConnected, address]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Portfolio App</Text>

      {isConnected ? (
        <>
          <Text style={styles.info}>Connected Wallet:</Text>
          <Text style={styles.wallet}>{address}</Text>

          <Text style={styles.info}>ETH Balance:</Text>
          {loading ? (
            <ActivityIndicator size='large' color='#FFD700' />
          ) : (
            <Text style={styles.balance}>{ethBalance} ETH</Text>
          )}

          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={disconnectWallet}>
            <Text style={styles.disconnectText}>Disconnect Wallet</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.connectButton} onPress={connectWallet}>
          <Text style={styles.connectText}>Connect Wallet</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 30,
  },
  info: {
    fontSize: 18,
    color: "#aaa",
    marginTop: 20,
  },
  wallet: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  balance: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 30,
  },
  connectButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  connectText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  disconnectButton: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  disconnectText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
