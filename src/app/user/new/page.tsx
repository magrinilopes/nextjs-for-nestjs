import { CreateUserForm } from '@/components/CreateUserForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Novo Usuário',
};

export default async function CreateUserPage() {
  return <CreateUserForm />;
}
