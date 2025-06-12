import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  const headingClassMap = {
    h1: 'text-2xl/tight sm:text-4xl font-extrabold',
    h2: 'text-xl/tight font-bold',
  };

  const commomClass = 'mb-4';

  return (
    <Tag className={clsx(headingClassMap[Tag], commomClass)}>
      <Link
        className='group-hover:text-slate-600 dark:group-hover:text-slate-300 transition ease-in-out'
        href={url}
      >
        {children}
      </Link>
    </Tag>
  );
}
