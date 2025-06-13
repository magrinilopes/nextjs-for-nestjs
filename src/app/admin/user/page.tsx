import { UpdateUser } from '@/components/admin/UpdateUser';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Usuário',
};

export default async function UserPage() {
  return (
    <Suspense fallback={<SpinLoader className='' />}>
      <UpdateUser />
    </Suspense>
  );
}
