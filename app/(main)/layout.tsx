/**
 * Root Layout for (main) group
 * Applies MainLayout to all main app pages
 */

import { MainLayout } from '@/components/layouts/MainLayout';

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
