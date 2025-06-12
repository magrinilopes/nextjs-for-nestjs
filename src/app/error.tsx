'use client';

import ErrorMessage from '@/components/ErrorMessage';

type RootErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RootError({}: RootErrorProps) {
  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      content='Erro inexperado na página. Tente novamente mais tarde.'
    />
  );
}
