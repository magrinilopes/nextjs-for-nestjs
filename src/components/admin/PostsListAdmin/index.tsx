import { findAllPostsFromApiAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import DeletePostButton from '../DeletePostButton';
import ErrorMessage from '../../ErrorMessage';

export default async function PostsListAdmin() {
  const postsRes = await findAllPostsFromApiAdmin();

  if (!postsRes.success) {
    console.log(postsRes.errors);
    return (
      <ErrorMessage
        contentTitle='Ops! 🫣'
        content='Tente fazer o login novamente.'
      />
    );
  }

  const posts = postsRes.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage
        contentTitle='Ops! 🫣'
        content='Nenhum post criado. Bora?!'
      />
    );
  }

  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            className={clsx(
              'p-2',
              'flex gap-2 items-center justify-between',
              !post.published && 'bg-slate-300',
            )}
            key={post.id}
          >
            <Link
              href={`/admin/post/${post.id}`}
              className='flex gap-2 items-center'
            >
              {post.title}
              {!post.published && (
                <span className='text-xs text-slate-600 italic'>
                  (não publicado)
                </span>
              )}
            </Link>

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
