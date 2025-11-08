import { Shield, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="glass-card border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold gradient-text">zkUID</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your One Identity Across Web3 — Private. Secure. User-Owned.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/register" className="hover:text-primary transition-colors">Register</a></li>
              <li><a href="/verify" className="hover:text-primary transition-colors">Verify</a></li>
              <li><a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>Built with zk-Rollups for ETHGlobal Hackathon 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
