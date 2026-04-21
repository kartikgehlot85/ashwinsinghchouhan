export type ContentType = "research" | "article" | "publication" | "note";

/** Frontend-normalized content item (maps from backend ContentItem) */
export interface ContentItem {
  id: bigint;
  contentType: ContentType;
  title: string;
  description: string;
  tags: string[];
  date: string;
  createdAt: bigint;
  fileUrl?: string;
  externalUrl?: string;
}

export interface ContactSubmission {
  id: bigint;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: bigint;
}

export interface AddItemRequest {
  contentType: ContentType;
  title: string;
  description: string;
  date: string;
  tags: string[];
  fileUrl?: string;
  externalUrl?: string;
}

export interface UpdateItemRequest {
  id: bigint;
  contentType: ContentType;
  title: string;
  description: string;
  date: string;
  tags: string[];
  fileUrl?: string;
  externalUrl?: string;
}

export interface AdminSession {
  token: string;
  expiresAt: number;
}

export interface TimelineEntry {
  year: string;
  description: string;
}

export interface AboutData {
  bio: string;
  timeline: TimelineEntry[];
}
