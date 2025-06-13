import type { Metadata } from 'next';
import { MenuAdmin } from '@/components/admin/MenuAdmin';
import { requireLoginSessionForApiOrRedirect } from '@/lib/login/manage-login';

export const metadata: Metadata = {
  title: {
    default: 'The Blog | Admin',
    template: '%s | The Blog',
  },
  description: 'Esta seria a descrição da página',
};

type AdminPostLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionForApiOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
