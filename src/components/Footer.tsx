import { Radar } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Radar className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">NicheRadar</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Find low-competition YouTube niches with viral potential. Built for faceless creators.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-smooth">Features</a></li>
            <li><a href="#" className="hover:text-foreground transition-smooth">Pricing</a></li>
            <li><a href="#" className="hover:text-foreground transition-smooth">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-smooth">About</a></li>
            <li><a href="#" className="hover:text-foreground transition-smooth">Blog</a></li>
            <li><a href="#" className="hover:text-foreground transition-smooth">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-6 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} NicheRadar. All rights reserved.</p>
          <p>Made for faceless YouTube creators.</p>
        </div>
      </div>
    </footer>
  );
};
