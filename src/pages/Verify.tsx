import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { toast } from "sonner";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [uid, setUid] = useState("");
  const [verificationType, setVerificationType] = useState("age");

  const handleGenerateProof = async () => {
    if (!uid) {
      toast.error("Please enter a UID");
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("ZK Proof generated successfully!");
      setLoading(false);
      setVerifying(false);
    } catch (error: any) {
      toast.error("Failed to generate proof");
      setLoading(false);
    }
  };

  const handleVerifyProof = async () => {
    setVerifying(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const isVerified = Math.random() > 0.2; // Mock 80% success rate
      setVerified(isVerified);
      
      if (isVerified) {
        toast.success("Identity verified successfully!");
      } else {
        toast.error("Verification failed");
      }
    } catch (error: any) {
      toast.error("Verification failed");
      setVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold gradient-text mb-4">Verify Identity</h1>
            <p className="text-muted-foreground">
              Verify identity attributes without revealing personal data
            </p>
          </div>

          <Card className="glass-card p-8 border-border/50 mb-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="uid">Enter UID</Label>
                <Input
                  id="uid"
                  placeholder="0xA9B...F73"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="type">Verification Type</Label>
                <Select value={verificationType} onValueChange={setVerificationType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="age">Age Verification (18+)</SelectItem>
                    <SelectItem value="email">Email Ownership</SelectItem>
                    <SelectItem value="full">Full Identity</SelectItem>
                    <SelectItem value="kyc">KYC Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="py-8">
                  <Loader message="Generating zero-knowledge proof..." />
                </div>
              ) : (
                <Button 
                  onClick={handleGenerateProof} 
                  className="w-full bg-secondary hover:bg-secondary/90 glow-secondary-effect"
                >
                  Generate Proof
                </Button>
              )}
            </div>
          </Card>

          {!loading && (
            <Card className="glass-card p-8 border-border/50">
              <h3 className="text-xl font-semibold mb-4">Verify on Blockchain</h3>
              
              {verifying ? (
                <div className="py-8">
                  <Loader message="Verifying proof on blockchain..." />
                </div>
              ) : verified !== null ? (
                <div className={`p-6 rounded-lg border ${
                  verified 
                    ? "bg-primary/10 border-primary/50" 
                    : "bg-destructive/10 border-destructive/50"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    {verified ? (
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive" />
                    )}
                    <div>
                      <h4 className="font-semibold">
                        {verified ? "Verified Successfully" : "Verification Failed"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {verified 
                          ? "User meets the verification criteria"
                          : "Unable to verify the provided credentials"
                        }
                      </p>
                    </div>
                  </div>
                  
                  {verified && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verification Type:</span>
                        <span className="font-medium">
                          {verificationType === "age" ? "Age 18+" : 
                           verificationType === "email" ? "Email Verified" :
                           verificationType === "kyc" ? "KYC Approved" : "Full Identity"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Data Revealed:</span>
                        <span className="font-medium text-primary">None (Zero-Knowledge)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tx Hash:</span>
                        <span className="font-mono text-xs">0x{Math.random().toString(16).substring(2, 12)}...</span>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setVerified(null)}
                  >
                    Verify Another
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleVerifyProof}
                  className="w-full bg-primary hover:bg-primary/90 glow-effect"
                >
                  Verify Proof
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Verify;
