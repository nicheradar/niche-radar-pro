import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useFavorites = () => {
  const { user } = useAuth();
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setIds(new Set());
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .select("niche_id")
      .eq("user_id", user.id);
    if (!error && data) {
      setIds(new Set(data.map((r) => String(r.niche_id))));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (nicheId: string): Promise<"added" | "removed" | "error"> => {
      if (!user) return "error";
      const isFav = ids.has(nicheId);
      if (isFav) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("niche_id", nicheId);
        if (error) {
          toast.error("Couldn't remove favorite");
          return "error";
        }
        setIds((prev) => {
          const next = new Set(prev);
          next.delete(nicheId);
          return next;
        });
        return "removed";
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, niche_id: nicheId });
        if (error) {
          toast.error("Couldn't save favorite");
          return "error";
        }
        setIds((prev) => new Set(prev).add(nicheId));
        return "added";
      }
    },
    [user, ids]
  );

  return { ids, loading, toggle, refresh, isFavorite: (id: string) => ids.has(id) };
};
