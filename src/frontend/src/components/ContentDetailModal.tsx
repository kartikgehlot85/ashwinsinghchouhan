import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, ExternalLink, FileDown, Tag, User, X } from "lucide-react";
import type { ContentItem } from "../types";

interface ContentDetailModalProps {
  item: ContentItem;
  onClose: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  research: "bg-primary/20 text-primary border-primary/40",
  article: "bg-secondary/20 text-secondary border-secondary/40",
  publication: "bg-accent/20 text-accent border-accent/40",
  note: "bg-chart-4/20 text-chart-4 border-chart-4/40",
};

export function ContentDetailModal({ item, onClose }: ContentDetailModalProps) {
  const typeColor =
    TYPE_COLORS[item.contentType] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <Dialog
      open
      onOpenChange={(o) => !o && onClose()}
      data-ocid="content.detail_dialog"
    >
      <DialogContent className="bg-card border border-border max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3 pr-8">
            <Badge
              variant="outline"
              className={`text-xs font-mono uppercase tracking-wider shrink-0 ${typeColor}`}
            >
              {item.contentType}
            </Badge>
          </div>
          <DialogTitle className="font-display text-xl font-bold text-foreground leading-tight mt-2">
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Ashwin Singh Chouhan
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {item.fileUrl && (
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-secondary hover:underline"
              >
                <FileDown className="w-3.5 h-3.5" /> View File
              </a>
            )}
            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> External Link
              </a>
            )}
          </div>

          <Separator className="bg-border/50" />

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Abstract
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-border text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              className="border-border"
              onClick={onClose}
              data-ocid="content.detail.close_button"
            >
              <X className="w-4 h-4 mr-2" /> Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
