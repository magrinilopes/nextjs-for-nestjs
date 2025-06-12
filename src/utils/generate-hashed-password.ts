import { hashPassword, verifyPassword } from '@/lib/login/password-hashing';

(async () => {
  // nao deixar a senha
  const minhaSenha = '';
  const hashSenhaBase64 = await hashPassword(minhaSenha);

  console.log({ hashSenhaBase64 });

  const passValid = await verifyPassword('123456', hashSenhaBase64);
  console.log({ passValid });
})();
