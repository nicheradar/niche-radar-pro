import { Filter } from "lucide-react";

export type Filters = {
  style: "any" | "faceless" | "personal";
  format: "any" | "shorts" | "long-form";
  beginnerFriendly: boolean;
  lowCompetition: boolean;
  region: "any" | "global" | "us" | "eu" | "asia" | "latam";
};

export const defaultFilters: Filters = {
  style: "any",
  format: "any",
  beginnerFriendly: false,
  lowCompetition: false,
  region: "any",
};

const Pill = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
      active
        ? "bg-primary text-primary-foreground border-primary shadow-sm"
        : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary"
    }`}
  >
    {children}
  </button>
);

const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

export const FiltersBar = ({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) => {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) =>
    onChange({ ...filters, [k]: v });

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-card">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Filter className="h-4 w-4" />
        </div>
        <h3 className="font-display font-bold">Refine your search</h3>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Group label="Style">
          {(["any", "faceless", "personal"] as const).map((v) => (
            <Pill key={v} active={filters.style === v} onClick={() => set("style", v)}>
              {v === "any" ? "Any" : v === "faceless" ? "Faceless" : "Personal"}
            </Pill>
          ))}
        </Group>

        <Group label="Format">
          {(["any", "shorts", "long-form"] as const).map((v) => (
            <Pill key={v} active={filters.format === v} onClick={() => set("format", v)}>
              {v === "any" ? "Any" : v === "shorts" ? "Shorts" : "Long-form"}
            </Pill>
          ))}
        </Group>

        <Group label="Audience region">
          {(["any", "global", "us", "eu", "asia", "latam"] as const).map((v) => (
            <Pill key={v} active={filters.region === v} onClick={() => set("region", v)}>
              {v === "any" ? "Any" : v.toUpperCase()}
            </Pill>
          ))}
        </Group>

        <Group label="Quick filters">
          <Pill
            active={filters.beginnerFriendly}
            onClick={() => set("beginnerFriendly", !filters.beginnerFriendly)}
          >
            Beginner friendly
          </Pill>
          <Pill
            active={filters.lowCompetition}
            onClick={() => set("lowCompetition", !filters.lowCompetition)}
          >
            Low competition
          </Pill>
        </Group>
      </div>
    </div>
  );
};
