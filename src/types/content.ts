export type SiteSettings = Record<string, string>;

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  sort_order: number;
  is_published: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  attachment_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface StatCounter {
  id: string;
  label: string;
  start_value: number;
  end_value: number;
  suffix: string;
  sort_order: number;
}

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  photo_url: string;
  bio: string;
  sort_order: number;
  is_published: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  image_url: string;
  sort_order: number;
  is_published: boolean;
}

export interface GalleryImage {
  id: string;
  caption: string;
  image_url: string;
  category: string;
  sort_order: number;
  is_published: boolean;
}

export interface ResultDoc {
  id: string;
  title: string;
  class_name: string;
  session: string;
  file_url: string;
  is_published: boolean;
}

export interface Disclosure {
  id: string;
  title: string;
  file_url: string;
  sort_order: number;
  is_published: boolean;
}

export interface AlumniEntry {
  id: string;
  name: string;
  batch: string;
  photo_url: string;
  message: string;
  is_published: boolean;
}
