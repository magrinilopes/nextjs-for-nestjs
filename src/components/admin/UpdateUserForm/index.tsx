'use client';

import { deleteUserAction } from '@/actions/user/delete-user-action';
import { updateUserAction } from '@/actions/user/update-user-action';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { InputText } from '@/components/InputText';
import { PublicUserDto } from '@/lib/user/schemas';
import { asyncDelay } from '@/utils/async-delay';
import clsx from 'clsx';
import { LockKeyholeIcon, OctagonXIcon, UserPenIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type UpdateUserFormProps = {
  user: PublicUserDto;
};

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [state, action, isPending] = useActionState(updateUserAction, {
    user,
    errors: [],
    success: false,
  });

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isTransitioning, startTransition] = useTransition();
  const safetyDelay = 8000;
  const isElementsDisabled = isTransitioning || isPending;

  function showDeleteDialogAccount(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    setIsDialogVisible(true);

    startTransition(async () => {
      await asyncDelay(safetyDelay);
    });
  }

  function handleDeleteUserAccount() {
    startTransition(async () => {
      if (!confirm('Confirma só mais uma vez que quer continuar')) return;

      const result = await deleteUserAction();

      if (result.errors) {
        toast.dismiss();
        result.errors.forEach(e => toast.error(e));
      }

      setIsDialogVisible(false);
    });
  }

  useEffect(() => {
    toast.dismiss();

    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }

    if (state.success) {
      toast.success('Atualizado com sucesso!');
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <h1 className='text-2xl text-center'>Seus dados</h1>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={isElementsDisabled}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isElementsDisabled}
          defaultValue={state.user.email}
          required
        />

        <Button disabled={isElementsDisabled} type='submit' className='mt-4'>
          <UserPenIcon />
          Atualizar
        </Button>

        <div className='flex gap-4 items-center justify-between mt-8'>
          <Link
            className={clsx(
              'flex gap-2 items-center justify-center transition',
              'text-green-600 hover:text-green-800',
            )}
            href='/admin/user/password'
          >
            <LockKeyholeIcon />
            Trocar senha
          </Link>

          <Link
            className={clsx(
              'flex gap-2 items-center justify-center transition',
              'text-red-600 hover:text-red-800',
            )}
            href='#'
            onClick={showDeleteDialogAccount}
          >
            <OctagonXIcon />
            Apagar conta
          </Link>
        </div>
      </form>

      <Dialog
        content={
          <p>
            Ao apagar meu usuário, meus dados e todos os meus posts também serão
            excluídos. Essa ação é IRREVERSÍVEL. Em alguns segundos os botões
            serão liberados. Clique em <strong>Confirmar</strong> para confirmar
            ou <strong>Cancelar</strong> para fechar essa janela.
          </p>
        }
        disabled={isElementsDisabled}
        onCancel={() => setIsDialogVisible(false)}
        onConfirm={handleDeleteUserAccount}
        isVisible={isDialogVisible}
        title='Apagar meu usuário'
      />
    </div>
  );
}
