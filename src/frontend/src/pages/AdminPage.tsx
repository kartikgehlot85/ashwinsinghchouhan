import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Lock, LogOut, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLoginModal } from "../components/AdminLoginModal";
import { ContentFormModal } from "../components/ContentFormModal";
import { useAdmin } from "../hooks/useAdmin";
import { useContent, useDeleteItem } from "../hooks/useContent";
import type { ContentItem, ContentType } from "../types";

const TABS: { value: ContentType; label: string }[] = [
  { value: "research", label: "Research" },
  { value: "article", label: "Articles" },
  { value: "publication", label: "Publications" },
  { value: "note", label: "Notes" },
];

function AdminContent() {
  const { logout, token } = useAdmin();
  const [activeTab, setActiveTab] = useState<ContentType>("research");
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const { data: items = [] } = useContent(activeTab);
  const deleteMutation = useDeleteItem();

  const handleDelete = async (item: ContentItem) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    if (!token) return;
    try {
      await deleteMutation.mutateAsync({ token, id: item.id });
      toast.success("Item deleted successfully.");
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="flex items-center justify-between mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/20 border border-accent/40">
            <ShieldCheck className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your portfolio content
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={logout}
          className="text-muted-foreground hover:text-foreground text-sm"
          data-ocid="admin_page.logout_button"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </motion.div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as ContentType)}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <TabsList className="bg-card border border-border">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground"
                data-ocid={`admin_page.${tab.value}_tab`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            onClick={() => setAddOpen(true)}
            className="gradient-primary text-primary-foreground text-sm"
            data-ocid="admin_page.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add{" "}
            {TABS.find((t) => t.value === activeTab)?.label}
          </Button>
        </div>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {items.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 gap-3 text-center border border-dashed border-border rounded-xl"
                data-ocid="admin_page.empty_state"
              >
                <p className="text-muted-foreground text-sm">
                  No {tab.label.toLowerCase()} yet.
                </p>
                <Button
                  size="sm"
                  onClick={() => setAddOpen(true)}
                  className="gradient-primary text-primary-foreground"
                >
                  Add first item
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id.toString()}
                    className="flex items-start justify-between gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-smooth"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    data-ocid={`admin_page.item.${i + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-xs line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-border text-muted-foreground py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground hidden sm:block">
                        {item.date}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-primary"
                        onClick={() => setEditItem(item)}
                        data-ocid={`admin_page.edit_button.${i + 1}`}
                        aria-label="Edit item"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(item)}
                        data-ocid={`admin_page.delete_button.${i + 1}`}
                        aria-label="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {addOpen && (
        <ContentFormModal type={activeTab} onClose={() => setAddOpen(false)} />
      )}
      {editItem && (
        <ContentFormModal
          type={editItem.contentType}
          editItem={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}

export function AdminPage() {
  const { isAdmin, login } = useAdmin();
  const [loginOpen, setLoginOpen] = useState(true);

  if (isAdmin) return <AdminContent />;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-6 px-4"
      data-ocid="admin_page.locked_state"
    >
      <div className="text-center flex flex-col items-center gap-4">
        <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30">
          <Lock className="w-12 h-12 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Admin Area
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          This area is restricted to authorized administrators only.
        </p>
        <Button
          onClick={() => setLoginOpen(true)}
          className="gradient-primary text-primary-foreground mt-2"
          data-ocid="admin_page.login_button"
        >
          <ShieldCheck className="w-4 h-4 mr-2" /> Login to Access
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-muted-foreground text-sm"
        >
          <Link to="/">← Back to Home</Link>
        </Button>
      </div>
      <AdminLoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={login}
      />
    </div>
  );
}
