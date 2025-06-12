import ErrorMessage from '@/components/ErrorMessage';

export default function NotFound() {
  return (
    <ErrorMessage
      pageTitle='Página não encontrada | The Blog'
      contentTitle='404'
      content='Erro 404 - A página que você está tentando acessar não existe nesse
            site.'
    />
  );
}
