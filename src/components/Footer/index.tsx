import Link from 'next/link';

export function Footer() {
  return (
    <footer className='sticky bottom-0 mt-8'>
      <p className='bg-white/50 backdrop-blur-sm p-4 flex justify-center'>
        Copyright © {new Date().getFullYear()} - <Link href='/'>The Blog</Link>
      </p>
    </footer>
  );
}
