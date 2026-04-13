import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const PRODUCT_CONTENT_DIRECTORY_BY_SLUG: Record<string, string> = {
  'website-qc-house': 'qchouse',
  'website-topmus': 'topmus',
  'website-phuc-bani': 'phucbani',
  'website-fpt-telecom-bac-ninh': 'fpt-telecom',
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string) {
  if (!text) return '';
  return text.toString().toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function getDocumentPath(productSlug?: string | null, documentSlug?: string | null) {
  if (!documentSlug) return '/';
  if (!productSlug) return `/doc/${documentSlug}`;
  return `/${productSlug}/${documentSlug}`;
}

export function getProductContentDirectory(productSlug?: string | null) {
  if (!productSlug) return null;
  return PRODUCT_CONTENT_DIRECTORY_BY_SLUG[productSlug] ?? null;
}

export function getDocumentContentCandidates(
  productSlug?: string | null,
  documentSlug?: string | null,
  contentPath?: string | null,
) {
  const candidates: string[] = [];
  const contentDirectory = getProductContentDirectory(productSlug);

  if (contentDirectory && documentSlug) {
    candidates.push(`/${contentDirectory}/${documentSlug}.md`);
  }

  if (contentPath?.startsWith('/')) {
    candidates.push(contentPath);
  }

  return [...new Set(candidates)];
}
