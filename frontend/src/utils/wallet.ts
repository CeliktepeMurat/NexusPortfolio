import { ethers } from "ethers";

/**
 * Fetches the ETH balance of a connected wallet.
 * @param address Wallet address to fetch the balance for.
 * @returns ETH balance as a formatted string.
 */
export async function getEthBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
    );
    const balance = await provider.getBalance(address);
    return Number(ethers.formatEther(balance)).toFixed(4); // Convert from Wei to ETH and format to 4 decimals
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0.0000";
  }
}
