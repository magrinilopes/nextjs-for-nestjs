import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';
import { findAllPublicPostBySlugFromApiCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-static';

type PostSlugPros = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPros): Promise<Metadata> {
  const { slug } = await params;
  const postRes = await findAllPublicPostBySlugFromApiCached(slug);

  if (!postRes.success) {
    return {};
  }

  const post = postRes.data;

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlug({ params }: PostSlugPros) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
