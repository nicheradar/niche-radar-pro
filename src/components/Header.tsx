import { Radar, Heart, LogOut, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Header = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow transition-smooth group-hover:scale-105">
            <Radar className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            NicheRadar
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="/#features" className="hover:text-foreground transition-smooth">Features</a>
          <a href="/#how" className="hover:text-foreground transition-smooth">How it works</a>
          <a href="/#pricing" className="hover:text-foreground transition-smooth">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 sm:px-4 text-sm font-medium hover:border-primary/40 transition-smooth"
              >
                <Heart className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Saved</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex h-9 items-center gap-1.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden sm:inline-flex h-9 items-center px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-sm font-semibold text-background hover:opacity-90 transition-smooth"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
