import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockBackend } from "../mocks/backend";
import type {
  AboutData,
  AddItemRequest,
  ContactSubmission,
  ContentItem,
  ContentType,
  UpdateItemRequest,
} from "../types";

// Map backend item to frontend ContentItem
function mapItem(item: {
  id: bigint;
  contentType: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  createdAt: bigint;
  fileUrl?: string;
  externalUrl?: string;
}): ContentItem {
  return {
    id: item.id,
    contentType: item.contentType as ContentType,
    title: item.title,
    description: item.description,
    tags: item.tags,
    date: item.date,
    createdAt: item.createdAt,
    fileUrl: item.fileUrl,
    externalUrl: item.externalUrl,
  };
}

export function useContent(type?: ContentType) {
  return useQuery<ContentItem[]>({
    queryKey: ["content", type ?? "all"],
    queryFn: async () => {
      if (!type) {
        const [r, a, p, n] = await Promise.all([
          mockBackend.getItemsByType("research"),
          mockBackend.getItemsByType("article"),
          mockBackend.getItemsByType("publication"),
          mockBackend.getItemsByType("note"),
        ]);
        return [...r, ...a, ...p, ...n].map(mapItem);
      }
      const items = await mockBackend.getItemsByType(type);
      return items.map(mapItem);
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useContentItem(id: bigint) {
  return useQuery<ContentItem | null>({
    queryKey: ["content", "item", id.toString()],
    queryFn: async () => {
      const item = await mockBackend.getItem(id);
      return item ? mapItem(item) : null;
    },
  });
}

export function useAddItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      request,
    }: {
      token: string;
      request: AddItemRequest;
    }): Promise<ContentItem> => {
      const result = await mockBackend.addItem(token, {
        contentType: request.contentType,
        title: request.title,
        description: request.description,
        date: request.date,
        tags: request.tags,
        fileUrl: request.fileUrl,
        externalUrl: request.externalUrl,
      });
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapItem(result.ok);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      request,
    }: {
      token: string;
      request: UpdateItemRequest;
    }): Promise<void> => {
      const result = await mockBackend.updateItem(token, {
        id: request.id,
        contentType: request.contentType,
        title: request.title,
        description: request.description,
        date: request.date,
        tags: request.tags,
        fileUrl: request.fileUrl,
        externalUrl: request.externalUrl,
      });
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      id,
    }: {
      token: string;
      id: bigint;
    }): Promise<void> => {
      const result = await mockBackend.deleteItem(token, id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

export function useContacts(token: string) {
  return useQuery<ContactSubmission[]>({
    queryKey: ["contacts", token],
    queryFn: async () => {
      if (!token) return [];
      const result = await mockBackend.getContacts(token);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        subject: c.subject,
        message: c.message,
        submittedAt: c.submittedAt,
      }));
    },
    enabled: !!token,
    staleTime: 60 * 1000,
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      contactId,
    }: {
      token: string;
      contactId: bigint;
    }): Promise<void> => {
      const result = await mockBackend.deleteContact(token, contactId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}

export function useAbout() {
  return useQuery<AboutData>({
    queryKey: ["about"],
    queryFn: async () => {
      return mockBackend.getAbout();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateAbout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      token,
      data,
    }: {
      token: string;
      data: AboutData;
    }): Promise<void> => {
      const result = await mockBackend.updateAbout(token, data);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["about"] });
    },
  });
}
