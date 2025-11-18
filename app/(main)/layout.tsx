/**
 * Root Layout for (main) group
 * Applies MainLayout to all main app pages
 */

import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
