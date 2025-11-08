import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Upload, CheckCircle, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { registerUser } from "@/utils/api";
import { toast } from "sonner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
    twitter: "",
    linkedin: "",
  });
  const [registrationData, setRegistrationData] = useState({
    uid: "",
    ipfsCid: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!window.ethereum) {
      toast.error("Please connect your wallet first!");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call (replace with actual backend call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - replace with actual API call
      const mockUid = "0x" + Math.random().toString(16).substring(2, 42);
      const mockCid = "Qm" + Math.random().toString(36).substring(2, 48);
      
      setRegistrationData({
        uid: mockUid,
        ipfsCid: mockCid,
      });
      
      setRegistered(true);
      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (registered) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-2xl mx-auto">
            <Card className="glass-card p-8 border-border/50">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-2">Registration Successful!</h2>
                <p className="text-muted-foreground">Your Universal ID has been created</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-muted-foreground">Your UID</Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(registrationData.uid, "UID")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="font-mono text-sm break-all">{registrationData.uid}</p>
                </div>

                <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-muted-foreground">IPFS CID</Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(registrationData.ipfsCid, "IPFS CID")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="font-mono text-sm break-all">{registrationData.ipfsCid}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button className="flex-1" onClick={() => setRegistered(false)}>
                  Register Another
                </Button>
                <Button variant="outline" className="flex-1">
                  View Dashboard
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold gradient-text mb-4">Create Your UID</h1>
            <p className="text-muted-foreground">
              Register once and use your Universal ID across all Web3 platforms
            </p>
          </div>

          <Card className="glass-card p-8 border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="twitter">Twitter Handle (Optional)</Label>
                <Input
                  id="twitter"
                  placeholder="@johndoe"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/in/johndoe"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div className="pt-4">
                {loading ? (
                  <div className="py-8">
                    <Loader message="Encrypting and uploading to IPFS..." />
                  </div>
                ) : (
                  <Button type="submit" className="w-full gap-2 bg-primary hover:bg-primary/90 glow-effect">
                    <Upload className="w-5 h-5" />
                    Encrypt & Upload
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
