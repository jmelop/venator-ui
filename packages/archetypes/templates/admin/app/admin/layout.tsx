'use client';

import { DashboardLayout } from '@venator/patterns';
import { Sidebar } from '../../components/sidebar';
import { Header } from '../../components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout sidebar={<Sidebar />} header={<Header />}>
      {children}
    </DashboardLayout>
  );
}
