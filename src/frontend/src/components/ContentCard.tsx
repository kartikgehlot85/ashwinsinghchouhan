import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronRight,
  ExternalLink,
  FileDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "../hooks/useAdmin";
import { useDeleteItem } from "../hooks/useContent";
import type { ContentItem } from "../types";

interface ContentCardProps {
  item: ContentItem;
  index?: number;
  onSelect?: (item: ContentItem) => void;
  onEdit?: (item: ContentItem) => void;
}

const TYPE_COLORS: Record<string, string> = {
  research: "bg-primary/20 text-primary border-primary/40",
  article: "bg-secondary/20 text-secondary border-secondary/40",
  publication: "bg-accent/20 text-accent border-accent/40",
  note: "bg-chart-4/20 text-chart-4 border-chart-4/40",
};

export function ContentCard({
  item,
  index = 0,
  onSelect,
  onEdit,
}: ContentCardProps) {
  const { isAdmin, token } = useAdmin();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const deleteMutation = useDeleteItem();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation({ x: -y * 8, y: x * 8 });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleDelete = async () => {
    if (!token) return;
    try {
      await deleteMutation.mutateAsync({ token, id: item.id });
      toast.success("Item deleted successfully.");
    } catch {
      toast.error("Failed to delete item.");
    }
    setConfirmDelete(false);
  };

  const typeColor =
    TYPE_COLORS[item.contentType] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <>
      <button
        type="button"
        ref={cardRef}
        className="group relative cursor-pointer w-full text-left"
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect?.(item)}
        data-ocid={`content.item.${index + 1}`}
        aria-label={item.title}
      >
        <div
          className="relative bg-card border border-border rounded-xl p-5 transition-all duration-300 ease-out overflow-hidden"
          style={{
            transform: isHovered
              ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(12px)`
              : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
            boxShadow: isHovered
              ? "0 20px 40px rgba(0,0,0,0.4), 0 0 30px oklch(0.62 0.28 166 / 0.2)"
              : "0 4px 12px rgba(0,0,0,0.15)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Gradient border top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 gradient-primary opacity-0 group-hover:opacity-100 transition-smooth" />

          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.48 0.25 276 / 0.06) 0%, transparent 70%)",
            }}
          />

          {/* Admin controls — top right overlay */}
          {isAdmin && (
            <div
              className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-smooth"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-7 h-7 bg-card/90 backdrop-blur border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/60 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(item);
                }}
                aria-label="Edit item"
                data-ocid={`content.edit_button.${index + 1}`}
              >
                <Pencil className="w-3 h-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="w-7 h-7 bg-card/90 backdrop-blur border border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/60 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
                aria-label="Delete item"
                disabled={deleteMutation.isPending}
                data-ocid={`content.delete_button.${index + 1}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div className="relative z-10 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pr-20">
              <Badge
                variant="outline"
                className={`text-xs font-mono uppercase tracking-wider ${typeColor} shrink-0`}
              >
                {item.contentType}
              </Badge>
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-gradient transition-smooth">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {item.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-1 pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground">
                Ashwin Singh Chouhan
              </span>
              <div className="flex items-center gap-2">
                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-smooth border border-secondary/30 rounded-md px-2 py-0.5 hover:border-secondary/60"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View file"
                    data-ocid={`content.view_file.${index + 1}`}
                  >
                    <FileDown className="w-3 h-3" /> View File
                  </a>
                )}
                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-smooth border border-accent/30 rounded-md px-2 py-0.5 hover:border-accent/60"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open external link"
                    data-ocid={`content.external_link.${index + 1}`}
                  >
                    <ExternalLink className="w-3 h-3" /> External Link
                  </a>
                )}
                <span className="text-xs text-accent font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                  Read more <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Delete confirmation dialog */}
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent
          className="bg-card border border-destructive/30"
          data-ocid="content.delete_dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete this item?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              <span className="text-foreground font-medium">
                "{item.title}"
              </span>{" "}
              will be permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-border text-muted-foreground"
              data-ocid="content.delete_cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              data-ocid="content.delete_confirm_button"
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
