import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AtSign,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  FlaskConical,
  Inbox,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Newspaper,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminLoginModal } from "../components/AdminLoginModal";
import { ContentFormModal } from "../components/ContentFormModal";
import { useAdmin } from "../hooks/useAdmin";
import {
  useAbout,
  useContacts,
  useContent,
  useDeleteContact,
  useDeleteItem,
  useUpdateAbout,
} from "../hooks/useContent";
import type { AboutData, ContentItem, ContentType } from "../types";

// ─── Constants ───────────────────────────────────────────────────────────────

const CONTENT_TABS: {
  value: ContentType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "research", label: "Researches", icon: FlaskConical },
  { value: "article", label: "Articles", icon: Newspaper },
  { value: "publication", label: "Publications", icon: FileText },
  { value: "note", label: "Notes", icon: BookOpen },
];

type AdminTab = ContentType | "about" | "contacts";

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-green-600",
  "from-blue-500 to-indigo-600",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateTime(ts: bigint): string {
  const ms = Number(ts);
  const date = new Date(ms > 1e15 ? ms / 1_000_000 : ms);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── Content Tab ─────────────────────────────────────────────────────────────

function ContentTab({
  type,
  label,
  token,
}: {
  type: ContentType;
  label: string;
  token: string;
}) {
  const { data: items = [], isLoading } = useContent(type);
  const deleteMutation = useDeleteItem();
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);

  const handleDelete = async (item: ContentItem) => {
    if (!confirm(`Delete "${item.title}"? This action cannot be undone.`))
      return;
    try {
      await deleteMutation.mutateAsync({ token, id: item.id });
      toast.success("Item deleted successfully.");
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3"
        data-ocid={`admin_page.${type}_loading_state`}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-4 animate-pulse"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-4/5" />
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-muted-foreground text-sm">
          {items.length} {label.toLowerCase()} total
        </p>
        <Button
          onClick={() => setAddOpen(true)}
          size="sm"
          className="gradient-primary text-primary-foreground text-sm"
          data-ocid={`admin_page.${type}_add_button`}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add {label.slice(0, -1)}
        </Button>
      </div>

      {items.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-4 text-center border border-dashed border-border rounded-xl"
          data-ocid={`admin_page.${type}_empty_state`}
        >
          <div className="p-4 rounded-2xl bg-muted/30 border border-border">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-sm">
              No {label.toLowerCase()} yet
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Add your first item to get started.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setAddOpen(true)}
            className="gradient-primary text-primary-foreground"
            data-ocid={`admin_page.${type}_add_first_button`}
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
              data-ocid={`admin_page.${type}_item.${i + 1}`}
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
                  data-ocid={`admin_page.${type}_edit_button.${i + 1}`}
                  aria-label="Edit item"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(item)}
                  data-ocid={`admin_page.${type}_delete_button.${i + 1}`}
                  aria-label="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {addOpen && (
        <ContentFormModal type={type} onClose={() => setAddOpen(false)} />
      )}
      {editItem && (
        <ContentFormModal
          type={editItem.contentType}
          editItem={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </>
  );
}

// ─── About Us Tab ─────────────────────────────────────────────────────────────

function AboutTab({ token }: { token: string }) {
  const { data: about, isLoading } = useAbout();
  const updateMutation = useUpdateAbout();
  const [bio, setBio] = useState("");
  const [timeline, setTimeline] = useState<
    Array<{ key: string; year: string; description: string }>
  >([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (about && !initialized) {
      setBio(about.bio);
      setTimeline(
        about.timeline.map((t, idx) => ({ ...t, key: `entry-${idx}` })),
      );
      setInitialized(true);
    }
  }, [about, initialized]);

  const handleTimelineChange = (
    key: string,
    field: "year" | "description",
    value: string,
  ) => {
    setTimeline((prev) =>
      prev.map((entry) =>
        entry.key === key ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const handleAddTimelineEntry = () => {
    const key = `entry-${Date.now()}`;
    setTimeline((prev) => [...prev, { key, year: "", description: "" }]);
  };

  const handleRemoveTimelineEntry = (key: string) => {
    if (!confirm("Remove this timeline entry?")) return;
    setTimeline((prev) => prev.filter((e) => e.key !== key));
  };

  const handleSave = async () => {
    const data: AboutData = {
      bio,
      timeline: timeline.map(({ year, description }) => ({
        year,
        description,
      })),
    };
    try {
      await updateMutation.mutateAsync({ token, data });
      toast.success("About page updated successfully.");
    } catch {
      toast.error("Failed to update About page.");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-4 animate-pulse"
        data-ocid="admin_page.about_loading_state"
      >
        <div className="h-5 bg-muted rounded w-1/4" />
        <div className="h-40 bg-muted rounded" />
        <div className="h-5 bg-muted rounded w-1/3 mt-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Bio section */}
      <div className="flex flex-col gap-2">
        <Label className="text-foreground font-semibold text-sm">
          Full Biography
        </Label>
        <p className="text-muted-foreground text-xs mb-1">
          This text appears on the About page. Use blank lines to separate
          paragraphs.
        </p>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter full biography..."
          className="min-h-[200px] bg-input border-border focus:border-primary/60 text-sm leading-relaxed resize-y"
          data-ocid="admin_page.about_bio_textarea"
        />
      </div>

      {/* Timeline section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label className="text-foreground font-semibold text-sm">
            Timeline Entries
          </Label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddTimelineEntry}
            className="text-xs border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
            data-ocid="admin_page.about_add_timeline_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Entry
          </Button>
        </div>

        {timeline.length === 0 ? (
          <div
            className="py-8 text-center border border-dashed border-border rounded-xl text-muted-foreground text-sm"
            data-ocid="admin_page.about_timeline_empty_state"
          >
            No timeline entries yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {timeline.map((entry, i) => (
              <div
                key={entry.key}
                className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
                data-ocid={`admin_page.about_timeline_item.${i + 1}`}
              >
                <div className="flex flex-col gap-2 w-32 shrink-0">
                  <Label className="text-xs text-muted-foreground">Year</Label>
                  <Input
                    value={entry.year}
                    onChange={(e) =>
                      handleTimelineChange(entry.key, "year", e.target.value)
                    }
                    placeholder="e.g. 2020"
                    className="bg-input border-border text-xs h-8"
                    data-ocid={`admin_page.about_timeline_year.${i + 1}`}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <Input
                    value={entry.description}
                    onChange={(e) =>
                      handleTimelineChange(
                        entry.key,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Timeline description..."
                    className="bg-input border-border text-xs h-8"
                    data-ocid={`admin_page.about_timeline_desc.${i + 1}`}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 mt-5 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => handleRemoveTimelineEntry(entry.key)}
                  data-ocid={`admin_page.about_timeline_delete_button.${i + 1}`}
                  aria-label="Remove entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save */}
      <div className="flex justify-end pt-2 border-t border-border">
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="gradient-primary text-primary-foreground font-semibold px-6"
          data-ocid="admin_page.about_save_button"
        >
          {updateMutation.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Contact Card ─────────────────────────────────────────────────────────────

function ContactCard({
  submission,
  index,
  token,
}: {
  submission: {
    id: bigint;
    name: string;
    email: string;
    subject: string;
    message: string;
    submittedAt: bigint;
  };
  index: number;
  token: string;
}) {
  const deleteContact = useDeleteContact();
  const avatarGradient = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = getInitials(submission.name);
  const dateStr = formatDateTime(submission.submittedAt);

  const handleDelete = async () => {
    if (
      !confirm(
        `Delete message from "${submission.name}"? This cannot be undone.`,
      )
    )
      return;
    try {
      await deleteContact.mutateAsync({ token, contactId: submission.id });
      toast.success("Message deleted.");
    } catch {
      toast.error("Failed to delete message.");
    }
  };

  return (
    <motion.div
      className="relative bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg transition-smooth group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      data-ocid={`admin_page.contact_card.${index + 1}`}
    >
      {/* Gradient accent top strip */}
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-primary/60 via-accent/60 to-secondary/60 opacity-0 group-hover:opacity-100 transition-smooth" />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-display font-bold text-sm shadow-md`}
        >
          {initials}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
            <span className="font-display font-semibold text-foreground text-sm">
              {submission.name}
            </span>
            <a
              href={`mailto:${submission.email}`}
              className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors"
              data-ocid={`admin_page.contact_email.${index + 1}`}
            >
              <AtSign className="w-3 h-3" />
              {submission.email}
            </a>
          </div>

          <p className="font-semibold text-foreground text-sm mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-accent shrink-0" />
            {submission.subject}
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {submission.message}
          </p>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {dateStr}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${submission.email}?subject=Re: ${encodeURIComponent(submission.subject)}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-accent transition-colors px-3 py-1.5 rounded-lg border border-primary/30 hover:border-accent/40 hover:bg-accent/10"
            data-ocid={`admin_page.contact_reply_button.${index + 1}`}
          >
            <Mail className="w-3 h-3" />
            Reply
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
            disabled={deleteContact.isPending}
            data-ocid={`admin_page.contact_delete_button.${index + 1}`}
            aria-label="Delete message"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Contacts Tab ─────────────────────────────────────────────────────────────

function ContactsTab({ token }: { token: string }) {
  const { data: contacts = [], isLoading, isError } = useContacts(token);

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-3"
        data-ocid="admin_page.contacts_loading_state"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-5 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-3 text-center border border-dashed border-destructive/40 rounded-xl bg-destructive/5"
        data-ocid="admin_page.contacts_error_state"
      >
        <Mail className="w-10 h-10 text-destructive/60" />
        <p className="text-muted-foreground text-sm">
          Failed to load messages. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Stats */}
      {contacts.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-2">
          {[
            {
              label: "Total Received",
              value: contacts.length,
              icon: Mail,
              color: "text-primary",
              bg: "bg-primary/10 border-primary/20",
            },
            {
              label: "Unique Senders",
              value: new Set(contacts.map((c) => c.email)).size,
              icon: Users,
              color: "text-secondary",
              bg: "bg-secondary/10 border-secondary/20",
            },
            {
              label: "Latest",
              value: "Today",
              icon: Calendar,
              color: "text-accent",
              bg: "bg-accent/10 border-accent/20",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`flex items-center gap-3 p-3 rounded-xl border ${stat.bg}`}
            >
              <stat.icon className={`w-4 h-4 shrink-0 ${stat.color}`} />
              <div className="min-w-0">
                <p
                  className={`font-display font-bold text-lg leading-none ${stat.color}`}
                >
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5 truncate">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {contacts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 text-center border border-dashed border-border rounded-xl"
          data-ocid="admin_page.contacts_empty_state"
        >
          <div className="p-4 rounded-2xl bg-muted/30 border border-border">
            <Inbox className="w-10 h-10 text-muted-foreground" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-base">
              No messages yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Contact form submissions will appear here.
            </p>
          </div>
        </div>
      ) : (
        contacts.map((submission, i) => (
          <ContactCard
            key={submission.id.toString()}
            submission={submission}
            index={i}
            token={token}
          />
        ))
      )}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminContent() {
  const { logout, token } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("research");
  const { data: contacts = [] } = useContacts(token ?? "");
  const contactCount = contacts.length;

  const handleLogout = () => {
    logout();
    void navigate({ to: "/" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
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
          onClick={handleLogout}
          className="text-muted-foreground hover:text-foreground text-sm"
          data-ocid="admin_page.logout_button"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </motion.div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as AdminTab)}
      >
        <TabsList className="bg-card border border-border flex-wrap h-auto gap-1 p-1 mb-6">
          {CONTENT_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground text-xs sm:text-sm"
              data-ocid={`admin_page.${tab.value}_tab`}
            >
              <tab.icon className="w-3.5 h-3.5 mr-1.5" />
              {tab.label}
            </TabsTrigger>
          ))}
          {/* About Us tab */}
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary text-muted-foreground text-xs sm:text-sm"
            data-ocid="admin_page.about_tab"
          >
            <User className="w-3.5 h-3.5 mr-1.5" />
            About Us
          </TabsTrigger>
          {/* Contacts tab */}
          <TabsTrigger
            value="contacts"
            className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent text-muted-foreground relative text-xs sm:text-sm"
            data-ocid="admin_page.contacts_tab"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Contacts
            {contactCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center min-w-[1.1rem] h-[1.1rem] text-[10px] font-bold rounded-full bg-accent text-accent-foreground leading-none px-1">
                {contactCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Content type tabs */}
        {CONTENT_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ContentTab
                type={tab.value}
                label={tab.label}
                token={token ?? ""}
              />
            </motion.div>
          </TabsContent>
        ))}

        {/* About Us tab */}
        <TabsContent value="about">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-secondary/15 border border-secondary/30">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-foreground text-base">
                  About Us
                </h2>
                <p className="text-muted-foreground text-xs">
                  Edit bio text and timeline entries
                </p>
              </div>
            </div>
            <AboutTab token={token ?? ""} />
          </motion.div>
        </TabsContent>

        {/* Contacts tab */}
        <TabsContent value="contacts">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30">
                  <Inbox className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground text-base">
                    Contact Responses
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Messages submitted via your contact form
                  </p>
                </div>
              </div>
              {contactCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-semibold text-accent">
                    {contactCount} {contactCount === 1 ? "message" : "messages"}
                  </span>
                </div>
              )}
            </div>
            <ContactsTab token={token ?? ""} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Admin Page (route component) ────────────────────────────────────────────

export function AdminPage() {
  const { isAdmin, login } = useAdmin();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(true);

  if (isAdmin) return <AdminContent />;

  const handleLogin = async (password: string) => {
    const result = await login(password);
    if (result.success) {
      // Navigate to /admin after successful login
      void navigate({ to: "/admin" });
    }
    return result;
  };

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
        onLogin={handleLogin}
      />
    </div>
  );
}
