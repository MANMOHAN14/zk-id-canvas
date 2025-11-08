import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Copy, ExternalLink, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { shortenAddress } from "@/utils/wallet";

interface ProofHistory {
  id: string;
  date: string;
  type: string;
  verified: boolean;
  txHash: string;
}

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [uid] = useState("0x" + Math.random().toString(16).substring(2, 42));
  const [ipfsCid] = useState("Qm" + Math.random().toString(36).substring(2, 48));
  
  const [proofHistory] = useState<ProofHistory[]>([
    {
      id: "1",
      date: "2025-11-08",
      type: "Age Verification (18+)",
      verified: true,
      txHash: "0x9abc" + Math.random().toString(16).substring(2, 60),
    },
    {
      id: "2",
      date: "2025-11-07",
      type: "Email Verified",
      verified: true,
      txHash: "0x4fd3" + Math.random().toString(16).substring(2, 60),
    },
    {
      id: "3",
      date: "2025-11-06",
      type: "KYC Verification",
      verified: true,
      txHash: "0x7bae" + Math.random().toString(16).substring(2, 60),
    },
  ]);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your Universal ID and verification history</p>
          </div>

          {/* Profile Card */}
          <Card className="glass-card p-8 border-border/50 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Your Universal ID</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Wallet Address</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(walletAddress || "", "Wallet Address")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-sm">{walletAddress ? shortenAddress(walletAddress) : "Not connected"}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">UID</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(uid, "UID")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="font-mono text-sm">{uid.substring(0, 20)}...</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/20 border border-border/50 md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">IPFS CID</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(ipfsCid, "IPFS CID")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-mono text-sm break-all">{ipfsCid}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate Proof
                  </Button>
                  <Button variant="outline">View on IPFS</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Proof History */}
          <Card className="glass-card p-8 border-border/50">
            <h3 className="text-2xl font-bold mb-6">Proof History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Proof Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {proofHistory.map((proof) => (
                    <tr key={proof.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-4 text-sm">{proof.date}</td>
                      <td className="py-4 px-4 text-sm font-medium">{proof.type}</td>
                      <td className="py-4 px-4">
                        <Badge variant={proof.verified ? "default" : "destructive"} className="bg-primary/20 text-primary border-primary/50">
                          {proof.verified ? "✓ Verified" : "✗ Failed"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => copyToClipboard(proof.txHash, "Transaction Hash")}
                          className="font-mono text-sm text-primary hover:underline flex items-center gap-2"
                        >
                          {proof.txHash.substring(0, 10)}...
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
