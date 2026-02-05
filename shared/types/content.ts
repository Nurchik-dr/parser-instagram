export type ContentSource = "instagram" | "news";

export interface ContentItem {
  id: string;
  source: ContentSource;
  type: "video" | "text";
  title?: string;
  text?: string;
  mediaUrl?: string;
}
