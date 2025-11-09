import { ethers } from "ethers";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  } else {
    throw new Error("Please install MetaMask!");
  }
};

export const shortenAddress = (address) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const getBalance = async (address) => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  }
  return "0";
};

export const disconnectWallet = () => {
  // Clear wallet state (MetaMask doesn't have a disconnect method, but we can clear our local state)
  return null;
};
