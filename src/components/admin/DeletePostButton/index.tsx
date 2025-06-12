'use client';

import { deletePostAction } from '@/actions/post/delete-post-actions';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export default function DeletePostButton({ title, id }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Post apagado com sucesso!');
    });
  }

  return (
    <>
      <button
        aria-label={`Apagar post ${title}`}
        title={`Apagar post ${title}`}
        className={clsx(
          'h-10 w-10 text-red-600 cursor-pointer p-2 flex items-center justify-center rounded-md hover:bg-red-600 hover:text-white transition-all duration-150 ease-in-out',
          'disabled:text-slate-500 disabled:bg-slate-200 disabled:cursor-not-allowed',
          '[&_svg]:w-4 [&_svg]:h-4 hover:[&_svg]:w-5 hover:[&_svg]:h-5',
        )}
        disabled={isPending}
        onClick={handleClick}
      >
        <Trash2Icon size={18} />
      </button>
      {showDialog && (
        <Dialog
          isVisible={true}
          disabled={isPending}
          title='Confirmação'
          content={`Tem certeza que deseja apagar o post ${title}`}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
