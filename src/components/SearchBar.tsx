import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";

export const SearchBar = ({ size = "lg" }: { size?: "lg" | "md" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState("");

  useEffect(() => {
    const currentQuery = new URLSearchParams(location.search).get("q") || "";
    setQ(currentQuery);
  }, [location.search]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanQuery = q.trim();

    if (!cleanQuery) {
      navigate("/results");
      return;
    }

    navigate(`/results?q=${encodeURIComponent(cleanQuery)}`);
  };

  const big = size === "lg";

  return (
    <form
      onSubmit={submit}
      className="group relative w-full max-w-2xl mx-auto"
    >
      <div className="relative flex items-center rounded-2xl border border-border bg-card shadow-card transition-smooth group-focus-within:shadow-elegant group-focus-within:border-primary/40">
        <Search
          className={`${
            big ? "ml-5 h-5 w-5" : "ml-4 h-4 w-4"
          } text-muted-foreground shrink-0`}
        />

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try: AI tools, cats, finance, horror, motivation…"
          className={`flex-1 bg-transparent outline-none px-3 ${
            big ? "py-5 text-base" : "py-3 text-sm"
          } placeholder:text-muted-foreground`}
        />

        <button
          type="submit"
          className={`m-1.5 inline-flex items-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition-smooth ${
            big ? "px-5 py-3 text-sm" : "px-4 py-2 text-sm"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Find niches</span>
          <span className="sm:hidden">Find</span>
        </button>
      </div>
    </form>
  );
};
