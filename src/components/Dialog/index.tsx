'use client';

import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  isVisible?: boolean;
  disabled: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

export function Dialog({
  isVisible = false,
  disabled = false,
  title,
  content,
  onConfirm,
  onCancel,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 bg-slate-900/50 backdrop-blur-sm',
        'flex items-center justify-center',
        'z-50',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
          'flex flex-col gap-6',
          'shadow-lg shadow-slate-800/30 text-center md:text-left',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='text-2xl font-medium'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex items-center justify-end gap-4'>
          <Button
            variant='gray'
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant='default' onClick={onConfirm} disabled={disabled}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
