import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Keywords Planner',
  description: 'Private SEO intelligence platform for keyword research, search intent, competitor analysis, and content strategy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
