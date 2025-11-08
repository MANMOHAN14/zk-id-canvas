import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, UserPlus, CheckCircle2, Lock, Globe, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectWallet } from "@/utils/wallet";
import { toast } from "sonner";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleCreateUID = async () => {
    if (!walletAddress) {
      try {
        const address = await connectWallet();
        setWalletAddress(address);
        toast.success("Wallet connected successfully!");
        setTimeout(() => navigate("/register"), 500);
      } catch (error: any) {
        toast.error(error.message || "Please connect your MetaMask wallet first");
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by zk-Rollups</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your One Identity
            <br />
            <span className="gradient-text">Across Web3</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Private. Secure. User-Owned. Create your Universal ID once and verify your identity anywhere without revealing personal data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleCreateUID}
              className="gap-2 bg-primary hover:bg-primary/90 text-lg px-8 glow-effect"
            >
              <UserPlus className="w-5 h-5" />
              {walletAddress ? "Create UID" : "Connect & Create UID"}
            </Button>
            <Link to="/verify">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                <CheckCircle2 className="w-5 h-5" />
                Verify Identity
              </Button>
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Register Once</h3>
              <p className="text-muted-foreground">
                Fill in your details once. Your data is encrypted and stored securely on IPFS.
              </p>
            </Card>

            <Card className="glass-card p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Generate UID</h3>
              <p className="text-muted-foreground">
                Get your unique Universal ID stored on blockchain with zk-Rollups.
              </p>
            </Card>

            <Card className="glass-card p-6 text-center border-border/50">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Verify Anywhere</h3>
              <p className="text-muted-foreground">
                Prove your identity privately without revealing any personal data.
              </p>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why zkUID?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card p-6 border-border/50">
              <Lock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Zero-Knowledge Proofs</h3>
              <p className="text-muted-foreground">
                Verify your identity without revealing any personal information using zk-SNARKs technology.
              </p>
            </Card>

            <Card className="glass-card p-6 border-border/50">
              <Globe className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Decentralized Storage</h3>
              <p className="text-muted-foreground">
                Your encrypted data lives on IPFS, ensuring true ownership and censorship resistance.
              </p>
            </Card>

            <Card className="glass-card p-6 border-border/50">
              <Zap className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">zk-Rollup Scaling</h3>
              <p className="text-muted-foreground">
                Lightning-fast verification with low gas fees powered by Layer 2 rollup technology.
              </p>
            </Card>

            <Card className="glass-card p-6 border-border/50">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Owned Identity</h3>
              <p className="text-muted-foreground">
                You control your data. Revoke access anytime and choose what to share selectively.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
