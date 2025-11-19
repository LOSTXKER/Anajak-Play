'use client';

import { usePathname } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showRightSidebar = pathname === '/dashboard';

  return (
    <DashboardLayout showRightSidebar={showRightSidebar}>
      {children}
    </DashboardLayout>
  );
}
