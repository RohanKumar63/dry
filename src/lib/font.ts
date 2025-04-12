// lib/fonts.ts
import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: '../public/fonts/CustomFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CustomFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const defaultFont = customFont;
