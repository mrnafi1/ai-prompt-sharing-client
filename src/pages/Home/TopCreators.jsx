import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TopCreators = () => {
  const axiosPublic = useAxiosPublic();

  const { data: creators = [], isLoading } = useQuery({
    queryKey: ["topCreators"],
    queryFn: async () => (await axiosPublic.get("/users/top-creators")).data,
  });

  if (!isLoading && creators.length === 0) return null;

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-semibold text-ink">Top creators</h2>
        <p className="mt-1 text-sm text-ink-muted">Ranked by approved prompts published.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {creators.map((c) => (
            <div key={c.email} className="flex flex-col items-center rounded-xl border border-border bg-surface p-4 text-center">
              <img
                src={c.photoURL || "https://api.dicebear.com/7.x/initials/svg?seed=" + c.name}
                alt={c.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="mt-2 truncate text-sm font-medium text-ink">{c.name}</p>
              <p className="font-mono text-xs text-ink-muted">{c.promptCount} prompts</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreators;
