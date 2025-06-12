import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Blog | Feito com Next.js',
    template: '%s | The Blog',
  },
  description: 'Esta seria a descrição da página',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR'>
      <body data-color-mode='light'>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
