import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Search, Copy, Check, Heart, Eye, Trash2, AlertTriangle,
  LayoutGrid, Terminal, GitBranch, Puzzle, Bot, Github, BookOpen,
  Sparkles, Wrench, Code2, Zap, Globe, TrendingUp, Settings,
  MessageSquare, Layers, Cpu, Rocket
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/hooks/useI18n";
import staticData from "@/data/staticData";

type Category = "prompt" | "skill" | "hook" | "mcp" | "agent" | "github";
type Item = Record<string, unknown>;

const CAT_ICONS: Record<string, typeof Terminal> = {
  prompt: MessageSquare, skill: Terminal, hook: GitBranch,
  mcp: Puzzle, agent: Bot, github: Github,
};

const CAT_COLORS: Record<string, string> = {
  prompt: "var(--cat-prompt)", skill: "var(--cat-skill)", hook: "var(--cat-hook)",
  mcp: "var(--cat-mcp)", agent: "var(--cat-agent)", github: "var(--cat-github)",
};

// Role definitions per category
const ROLE_DEFS: Record<string, { id: string; name: string; icon: typeof Terminal }[]> = {
  prompt: [
    { id: "all", name: "全部", icon: LayoutGrid },
    { id: "creator", name: "创作者", icon: Sparkles },
    { id: "productManager", name: "产品经理", icon: Wrench },
    { id: "developer", name: "开发者", icon: Code2 },
    { id: "growth", name: "增长", icon: TrendingUp },
    { id: "founder", name: "创始人", icon: Rocket },
    { id: "strategist", name: "策略", icon: Settings },
    { id: "operations", name: "运营", icon: Globe },
    { id: "dataScientist", name: "数据", icon: Cpu },
    { id: "writer", name: "写作者", icon: BookOpen },
    { id: "researcher", name: "研究", icon: Layers },
    { id: "sales", name: "销售", icon: Zap },
  ],
  skill: [
    { id: "all", name: "全部", icon: LayoutGrid },
    { id: "claude", name: "Claude Code", icon: Terminal },
    { id: "ecommerce", name: "跨境电商", icon: Globe },
    { id: "developer", name: "开发者", icon: Code2 },
    { id: "productManager", name: "产品经理", icon: Wrench },
    { id: "researcher", name: "研究", icon: Layers },
    { id: "creator", name: "创作者", icon: Sparkles },
  ],
  hook: [
    { id: "all", name: "全部", icon: LayoutGrid },
    { id: "developer", name: "开发者", icon: Code2 },
  ],
  mcp: [
    { id: "all", name: "全部", icon: LayoutGrid },
    { id: "developer", name: "开发者", icon: Code2 },
  ],
  agent: [
    { id: "all", name: "全部", icon: LayoutGrid },
    { id: "developer", name: "开发者", icon: Code2 },
  ],
  github: [
    { id: "all", name: "全部", icon: LayoutGrid },
    { id: "developer", name: "开发者", icon: Code2 },
    { id: "creator", name: "创作者", icon: Sparkles },
  ],
};

function getItemsForCategory(cat: Category): Item[] {
  if (cat === "prompt") return staticData.prompts_full || [];
  return (staticData.skills_full || []).filter((s: Item) => s.category === cat);
}

// Tag governance: standardize and deduplicate tags
function normalizeTags(tags: unknown): string[] {
  if (!tags) return [];
  if (typeof tags === "string") return [tags];
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === "string");
  return [];
}

export default function UnifiedGallery({ category }: { category: Category }) {
  const { lang } = useI18n();
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const allItems = useMemo(() => getItemsForCategory(category), [category]);

  const roleDefs = ROLE_DEFS[category] || ROLE_DEFS.skill;

  const filteredItems = useMemo(() => {
    let items = allItems;
    if (activeRole !== "all") {
      items = items.filter((item) => item.role === activeRole);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((item) => {
        const title = String(item.title || "").toLowerCase();
        const desc = String(item.description || "").toLowerCase();
        const scenario = String(item.scenario || "").toLowerCase();
        const tags = normalizeTags(item.tags).join(" ").toLowerCase();
        return title.includes(q) || desc.includes(q) || scenario.includes(q) || tags.includes(q);
      });
    }
    return items;
  }, [allItems, activeRole, search]);

  // Auto-cancel delete confirmation
  useEffect(() => {
    if (deleteConfirm !== null) {
      const timer = setTimeout(() => setDeleteConfirm(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteConfirm]);

  // Card animation
  useEffect(() => {
    const timer = setTimeout(() => {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          card.style.transition = `opacity 0.4s ease-out ${i * 0.04}s, transform 0.4s ease-out ${i * 0.04}s`;
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }
      });
    }, 50);
    return () => clearTimeout(timer);
  }, [filteredItems]);

  const handleCopy = useCallback((item: Item) => {
    const id = item.id as number;
    const content = String(item.content || item.description || "");
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const handleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleDelete = useCallback((id: number) => {
    if (deleteConfirm === id) {
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  }, [deleteConfirm]);

  const catColor = CAT_COLORS[category] || "var(--text-muted)";
  const CatIcon = CAT_ICONS[category] || Terminal;

  return (
    <div>
      {/* Search + Role Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-light)" }} />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "zh" ? "搜索标题、描述、标签..." : "Search title, description, tags..."}
            className="pl-10 h-10 rounded-xl border-[var(--border-light)] bg-white text-sm focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {roleDefs.map((role) => {
            const isActive = activeRole === role.id;
            const RoleIcon = role.icon;
            const count = role.id === "all" ? allItems.length : allItems.filter((i) => i.role === role.id).length;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: isActive ? catColor : "transparent",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  border: isActive ? "none" : "1px solid var(--border-light)",
                }}
              >
                <RoleIcon className="w-3 h-3" />
                <span>{role.name}</span>
                <span
                  className="px-1 rounded text-[10px] font-semibold"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : "var(--c-warm-200)",
                    color: isActive ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {filteredItems.length} {lang === "zh" ? "个结果" : "results"}
          {activeRole !== "all" && ` · ${roleDefs.find((r) => r.id === activeRole)?.name}`}
        </span>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--text-light)" }} />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {lang === "zh" ? "没有找到匹配的内容" : "No matching items found"}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {filteredItems.map((item, i) => {
            const id = item.id as number;
            const title = String(item.title || item.titleEn || "");
            const description = String(item.description || "");
            const scenario = String(item.scenario || "");
            const author = String(item.author || "");
            const likes = (item.likes || 0) as number;
            const views = String(item.views || "");
            // const comments = (item.comments || 0) as number;
            // const itemRole = String(item.role || "");
            const tags = normalizeTags(item.tags);
            const isLiked = likedIds.has(id);
            const isDeleting = deleteConfirm === id;

            return (
              <div
                key={`${category}-${id}`}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="card-hover rounded-2xl border bg-white overflow-hidden"
                style={{
                  opacity: 0,
                  transform: "translateY(16px)",
                  borderColor: "var(--border-light)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Card header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: catColor + "12" }}
                      >
                        <CatIcon className="w-3.5 h-3.5" style={{ color: catColor }} />
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: catColor + "10", color: catColor }}
                      >
                        {category.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(id)}
                      className="flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-red-50 group"
                      title="Delete"
                    >
                      {isDeleting ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--text-light)" }} />
                      )}
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold leading-snug mb-2" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                        style={{
                          background: "var(--c-warm-100)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--text-secondary)" }}>
                    {description}
                  </p>

                  {/* Scenario & Problem */}
                  <div className="space-y-2">
                    {scenario && (
                      <div className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: catColor }}
                        />
                        <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {scenario}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div
                  className="px-5 py-3 flex items-center justify-between border-t"
                  style={{ borderColor: "var(--border-light)", background: "var(--c-warm-50)" }}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleCopy(item)}
                      className="flex items-center gap-1 text-[11px] font-medium transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {copiedId === id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedId === id ? (lang === "zh" ? "已复制" : "Copied") : (lang === "zh" ? "复制" : "Copy")}
                    </button>
                    <button
                      onClick={() => handleLike(id)}
                      className="flex items-center gap-1 text-[11px] font-medium transition-colors"
                      style={{ color: isLiked ? "var(--accent)" : "var(--text-muted)" }}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                      {likes + (isLiked ? 1 : 0)}
                    </button>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-light)" }}>
                      <Eye className="w-3.5 h-3.5" />
                      {views}
                    </span>
                  </div>
                  {author && (
                    <span className="text-[10px] truncate max-w-[120px]" style={{ color: "var(--text-light)" }}>
                      {author}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
