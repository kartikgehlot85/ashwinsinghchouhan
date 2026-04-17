import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  FileUp,
  Link2,
  Plus,
  Save,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "../hooks/useAdmin";
import { useAddItem, useUpdateItem } from "../hooks/useContent";
import type { ContentItem, ContentType } from "../types";

interface ContentFormModalProps {
  type: ContentType;
  onClose: () => void;
  /** If provided, the modal is in Edit mode */
  editItem?: ContentItem;
}

type UploadMode = "file" | "url";
type Step = "pick" | "details";

const TYPE_LABELS: Record<ContentType, string> = {
  research: "Research Project",
  article: "Article",
  publication: "Publication",
  note: "Note",
};

function FilePicker({
  mode,
  onModeChange,
  file,
  onFileChange,
  externalUrl,
  onExternalUrlChange,
  onNext,
}: {
  mode: UploadMode;
  onModeChange: (m: UploadMode) => void;
  file: File | null;
  onFileChange: (f: File | null) => void;
  externalUrl: string;
  onExternalUrlChange: (v: string) => void;
  onNext: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) onFileChange(f);
    },
    [onFileChange],
  );

  const canProceed = mode === "file" ? !!file : externalUrl.trim().length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Mode Tabs */}
      <div className="flex rounded-xl overflow-hidden border border-border bg-muted/30 p-1 gap-1">
        <button
          type="button"
          onClick={() => onModeChange("file")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-smooth ${
            mode === "file"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="content_form.file_tab"
        >
          <Upload className="w-4 h-4" /> Upload File
        </button>
        <button
          type="button"
          onClick={() => onModeChange("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-smooth ${
            mode === "url"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="content_form.url_tab"
        >
          <Link2 className="w-4 h-4" /> External URL
        </button>
      </div>

      {mode === "file" ? (
        <>
          {/* Dropzone */}
          <button
            type="button"
            className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-smooth text-center ${
              dragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/60 hover:bg-primary/5"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            aria-label="Upload file"
            data-ocid="content_form.dropzone"
          >
            <div className="p-3 rounded-xl bg-primary/15 border border-primary/30">
              <FileUp className="w-7 h-7 text-primary" />
            </div>
            {file ? (
              <>
                <p className="text-foreground font-medium text-sm">
                  {file.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {(file.size / 1024 / 1024).toFixed(2)} MB — Click to change
                </p>
              </>
            ) : (
              <>
                <p className="text-foreground font-medium text-sm">
                  Drop file here or click to browse
                </p>
                <p className="text-muted-foreground text-xs">
                  PDF, DOC, images — any format supported
                </p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
              data-ocid="content_form.upload_button"
            />
          </button>
          {file && (
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-destructive transition-smooth self-end flex items-center gap-1"
              onClick={() => onFileChange(null)}
            >
              <X className="w-3 h-3" /> Remove file
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground text-sm">
            External URL (DOI, journal link, Google Drive, etc.)
          </Label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={externalUrl}
              onChange={(e) => onExternalUrlChange(e.target.value)}
              placeholder="https://doi.org/... or https://drive.google.com/..."
              className="pl-9 bg-input border-border"
              data-ocid="content_form.url_input"
              autoFocus
            />
          </div>
          <p className="text-xs text-muted-foreground">
            The link will appear as an "External Link" button on the content
            card.
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-border text-muted-foreground"
          onClick={() => {
            onFileChange(null);
            onExternalUrlChange("");
            onNext();
          }}
          data-ocid="content_form.skip_button"
        >
          Skip — No file
        </Button>
        <Button
          type="button"
          className="flex-1 gradient-primary text-primary-foreground"
          disabled={!canProceed}
          onClick={onNext}
          data-ocid="content_form.next_button"
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}

export function ContentFormModal({
  type,
  onClose,
  editItem,
}: ContentFormModalProps) {
  const { token } = useAdmin();
  const isEdit = !!editItem;

  // Step state — edit mode skips straight to details
  const [step, setStep] = useState<Step>(isEdit ? "details" : "pick");
  const [uploadMode, setUploadMode] = useState<UploadMode>("file");
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState(editItem?.externalUrl ?? "");
  const [existingFileUrl, setExistingFileUrl] = useState(
    editItem?.fileUrl ?? "",
  );

  // Details fields
  const [title, setTitle] = useState(editItem?.title ?? "");
  const [description, setDescription] = useState(editItem?.description ?? "");
  const [tagsInput, setTagsInput] = useState(editItem?.tags.join(", ") ?? "");
  const [date, setDate] = useState(
    editItem?.date ?? new Date().toISOString().split("T")[0],
  );

  const addMutation = useAddItem();
  const updateMutation = useUpdateItem();
  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleNext = () => setStep("details");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    if (!token) {
      toast.error("Admin session expired. Please log in again.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // In production, file would be uploaded via object-storage extension
    // For now, use existing fileUrl or URL.createObjectURL as placeholder
    const resolvedFileUrl = file
      ? URL.createObjectURL(file)
      : existingFileUrl || undefined;
    const resolvedExternalUrl = externalUrl.trim() || undefined;

    try {
      if (isEdit && editItem) {
        await updateMutation.mutateAsync({
          token,
          request: {
            id: editItem.id,
            contentType: type,
            title: title.trim(),
            description: description.trim(),
            date,
            tags,
            fileUrl: resolvedFileUrl,
            externalUrl: resolvedExternalUrl,
          },
        });
        toast.success(`${TYPE_LABELS[type]} updated successfully!`);
      } else {
        await addMutation.mutateAsync({
          token,
          request: {
            contentType: type,
            title: title.trim(),
            description: description.trim(),
            date,
            tags,
            fileUrl: resolvedFileUrl,
            externalUrl: resolvedExternalUrl,
          },
        });
        toast.success(`${TYPE_LABELS[type]} added successfully!`);
      }
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  const typeGradientClass =
    type === "research"
      ? "text-primary"
      : type === "article"
        ? "text-secondary"
        : type === "publication"
          ? "text-accent"
          : "text-chart-4";

  return (
    <Dialog
      open
      onOpenChange={(o) => !o && onClose()}
      data-ocid="content_form.dialog"
    >
      <DialogContent className="bg-card border border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-foreground flex items-center gap-3">
            {isEdit ? (
              <Edit className={`w-5 h-5 ${typeGradientClass}`} />
            ) : (
              <Plus className={`w-5 h-5 ${typeGradientClass}`} />
            )}
            {isEdit ? "Edit" : "Add"} {TYPE_LABELS[type]}
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator — only for add flow */}
        {!isEdit && (
          <div className="flex items-center gap-2 mb-1">
            {(["pick", "details"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : i < (step === "details" ? 1 : 0)
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs ${step === s ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {s === "pick" ? "File / URL" : "Details"}
                </span>
                {i === 0 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>
        )}

        {step === "pick" && !isEdit ? (
          <FilePicker
            mode={uploadMode}
            onModeChange={setUploadMode}
            file={file}
            onFileChange={setFile}
            externalUrl={externalUrl}
            onExternalUrlChange={setExternalUrl}
            onNext={handleNext}
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
            {/* Back button for multi-step add flow */}
            {!isEdit && (
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth self-start"
                onClick={() => setStep("pick")}
                data-ocid="content_form.back_button"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to file
              </button>
            )}

            {/* Show chosen file/URL summary */}
            {(file || externalUrl || existingFileUrl) && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30 text-xs text-accent">
                {file ? (
                  <>
                    <FileUp className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </>
                ) : externalUrl ? (
                  <>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{externalUrl}</span>
                  </>
                ) : existingFileUrl ? (
                  <>
                    <FileUp className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Existing file attached</span>
                  </>
                ) : null}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground text-sm">Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${TYPE_LABELS[type].toLowerCase()} title`}
                className="bg-input border-border"
                data-ocid="content_form.title_input"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground text-sm">
                Description / Abstract *
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description or abstract..."
                rows={3}
                className="bg-input border-border resize-none"
                data-ocid="content_form.description_textarea"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground text-sm">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-input border-border"
                data-ocid="content_form.date_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground text-sm">
                Tags (comma-separated)
              </Label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Pharmacology, Drug Discovery, Chemistry"
                className="bg-input border-border"
                data-ocid="content_form.tags_input"
              />
            </div>

            {/* In edit mode or skip mode, show both URL fields inline */}
            {isEdit && (
              <>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-muted-foreground text-sm">
                    External URL (optional)
                  </Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="https://doi.org/..."
                      className="pl-9 bg-input border-border"
                      data-ocid="content_form.url_input"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-muted-foreground text-sm">
                    File URL (optional)
                  </Label>
                  <div className="relative">
                    <FileUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={existingFileUrl}
                      onChange={(e) => setExistingFileUrl(e.target.value)}
                      placeholder="https://..."
                      className="pl-9 bg-input border-border"
                      data-ocid="content_form.fileurl_input"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border text-muted-foreground"
                onClick={onClose}
                data-ocid="content_form.cancel_button"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-primary text-primary-foreground"
                disabled={isPending}
                data-ocid="content_form.submit_button"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> {isEdit ? "Update" : "Save"}
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
