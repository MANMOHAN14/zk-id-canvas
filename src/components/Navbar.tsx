import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Shield } from "lucide-react";
import { connectWallet, shortenAddress } from "@/utils/wallet";
import { toast } from "sonner";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const handleConnect = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      toast.success("Wallet connected successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to connect wallet");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">zkUID</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/register"
              className={`text-sm font-medium transition-colors ${
                isActive("/register") ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Register
            </Link>
            <Link
              to="/verify"
              className={`text-sm font-medium transition-colors ${
                isActive("/verify") ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Verify
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard") ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {walletAddress ? (
            <Button variant="outline" className="gap-2">
              <Wallet className="w-4 h-4" />
              {shortenAddress(walletAddress)}
            </Button>
          ) : (
            <Button onClick={handleConnect} className="gap-2 bg-primary hover:bg-primary/90">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
