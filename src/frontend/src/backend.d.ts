import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ContentType = string;
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Array<ContactSubmission>;
} | {
    __kind__: "err";
    err: string;
};
export interface ContactSubmission {
    id: ContactId;
    subject: string;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
}
export interface AddItemRequest {
    title: string;
    contentType: ContentType;
    date: string;
    tags: Array<string>;
    description: string;
    externalUrl?: string;
    fileUrl?: string;
}
export interface ContentItem {
    id: ItemId;
    title: string;
    contentType: ContentType;
    date: string;
    createdAt: Timestamp;
    tags: Array<string>;
    description: string;
    externalUrl?: string;
    fileUrl?: string;
}
export type Result_1 = {
    __kind__: "ok";
    ok: ContactSubmission;
} | {
    __kind__: "err";
    err: string;
};
export interface ContactRequest {
    subject: string;
    name: string;
    email: string;
    message: string;
}
export type Result = {
    __kind__: "ok";
    ok: boolean;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: ContentItem;
} | {
    __kind__: "err";
    err: string;
};
export type ItemId = bigint;
export interface UpdateItemRequest {
    id: ItemId;
    title: string;
    contentType: ContentType;
    date: string;
    tags: Array<string>;
    description: string;
    externalUrl?: string;
    fileUrl?: string;
}
export type Token = string;
export type LoginResult = {
    __kind__: "ok";
    ok: Token;
} | {
    __kind__: "err";
    err: string;
};
export type ContactId = bigint;
export interface backendInterface {
    addItem(token: Token, req: AddItemRequest): Promise<Result_3>;
    adminLogin(password: string): Promise<LoginResult>;
    deleteItem(token: Token, id: ItemId): Promise<Result>;
    getContacts(token: Token): Promise<Result_2>;
    getItem(id: ItemId): Promise<ContentItem | null>;
    getItemsByType(contentType: ContentType): Promise<Array<ContentItem>>;
    submitContact(req: ContactRequest): Promise<Result_1>;
    updateItem(token: Token, req: UpdateItemRequest): Promise<Result>;
    verifyToken(token: Token): Promise<boolean>;
}
