// lib/font.ts
import { Inter } from 'next/font/google';

// Replace the local font with Google Fonts
export const customFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const defaultFont = customFont;
