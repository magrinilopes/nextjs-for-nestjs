'use client';

import clsx from 'clsx';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { createUserAction } from '@/actions/user/create-user-action';
import { PublicUserSchema } from '@/lib/user/schemas';
import { toast } from 'react-toastify';
import { HoneypotInput } from '../HoneypotInput';

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'max-w-sm mt-6 mx-auto',
        'rounded-lg p-8 border border-green-500 bg-slate-100 shadow-lg shadow-slate-300',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <h1 className='text-2xl text-center'>Criar usuário</h1>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />
        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
          required
        />
        <InputText
          type='password'
          name='password2'
          labelText='Repetir senha'
          placeholder='Sua senha novamente'
          disabled={isPending}
          required
        />

        <HoneypotInput />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <UserRoundIcon />
          {!isPending && 'Criar Conta'}
          {isPending && 'Criando...'}
        </Button>
        <p className='text-green-800 text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
