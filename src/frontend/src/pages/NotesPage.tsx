import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, StickyNote } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ContentCard } from "../components/ContentCard";
import { ContentDetailModal } from "../components/ContentDetailModal";
import { ContentFormModal } from "../components/ContentFormModal";
import { useAdmin } from "../hooks/useAdmin";
import { useContent } from "../hooks/useContent";
import type { ContentItem } from "../types";

export function NotesPage() {
  const { data: items = [], isLoading } = useContent("note");
  const { isAdmin } = useAdmin();
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const [search, setSearch] = useState("");

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-chart-4/20 border border-chart-4/40">
            <StickyNote className="w-7 h-7 text-chart-4" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Notes
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Academic notes, study guides, and reference materials
            </p>
          </div>
        </div>
        {isAdmin && (
          <Button
            onClick={() => setAddOpen(true)}
            className="gradient-primary text-primary-foreground shrink-0"
            data-ocid="notes.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Note
          </Button>
        )}
      </motion.div>

      <motion.div
        className="relative max-w-md mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border"
          data-ocid="notes.search_input"
        />
      </motion.div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="notes.loading_state"
        >
          {["s1", "s2", "s3"].map((sk) => (
            <Skeleton key={sk} className="h-52 rounded-xl bg-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          data-ocid="notes.empty_state"
        >
          <StickyNote className="w-12 h-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">No notes found.</p>
          {isAdmin && (
            <Button
              onClick={() => setAddOpen(true)}
              size="sm"
              className="gradient-primary text-primary-foreground"
            >
              Add your first note
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <ContentCard
                item={item}
                index={i}
                onSelect={setSelected}
                onEdit={setEditItem}
              />
            </motion.div>
          ))}
        </div>
      )}

      {selected && (
        <ContentDetailModal item={selected} onClose={() => setSelected(null)} />
      )}
      {addOpen && (
        <ContentFormModal type="note" onClose={() => setAddOpen(false)} />
      )}
      {editItem && (
        <ContentFormModal
          type="note"
          editItem={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}
