export type Locale = 'de' | 'en';

export interface GalleryImage {
  id: string;
  filename: string;
  altTextEn: string;
  altTextDe: string;
  categoryId: string | null;
  category: Category | null;
  tags: string;
  featured: boolean;
  order: number;
  width: number;
  height: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameDe: string;
  order: number;
  visible: boolean;
}

export interface ProjectCase {
  id: string;
  titleEn: string;
  titleDe: string;
  descriptionEn: string;
  descriptionDe: string;
  heroImage: string;
  categoryId: string | null;
  linkTarget: string;
  order: number;
  visible: boolean;
}

export interface TextBlock {
  id: string;
  page: string;
  key: string;
  valueEn: string;
  valueDe: string;
}

export interface Link {
  id: string;
  label: string;
  url: string;
  type: string;
  icon: string;
  order: number;
  visible: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: string;
  consentAt: Date | null;
  consentIp: string | null;
  createdAt: Date;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  idea: string;
  size: string;
  placement: string;
  referenceImage: string;
  preferredDates: string;
  status: string;
  createdAt: Date;
}
