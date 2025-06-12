'use server';

import { createLoginSession } from '@/lib/login/manage-login';
import { verifyPassword } from '@/lib/login/password-hashing';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type loginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: loginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login not allowed.',
    };
  }

  await asyncDelay(5000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  // Dados digitados no form
  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuário e a senha',
    };
  }
  // Validaria se existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  console.log('USER', username, process.env.LOGIN_USER, isUsernameValid);
  console.log('PASS', password, process.env.LOGIN_PASS, isPasswordValid);

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha invalidos',
    };
  }

  // login ok - tudo valido
  await createLoginSession(username);
  redirect('/admin/post');
}
