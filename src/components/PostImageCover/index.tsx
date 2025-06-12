import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostImageCoverProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostImageCover({ imageProps, linkProps }: PostImageCoverProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        'w-full',
        'h-full',
        'overflow-hidden',
        'rounded-xl',
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          'group-hover:scale-105',
          'transition',
          'ease-in-out',
          'w-full',
          'h-full',
          'object-cover',
          'object-center',
          imageProps.className,
        )}
        alt={imageProps.alt}
      />
    </Link>
  );
}
