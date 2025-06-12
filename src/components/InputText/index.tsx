import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className='flex flex-col gap-1 group'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        id={id}
        className={clsx(
          'bg-white outline-0 ring-2 ring-slate-400',
          'text-base/tight rounded-md p-2',
          'focus:ring-blue-400',
          'placeholder-slate-300 disabled:placeholder-slate-400',
          'disabled:bg-slate-200 disabled:text-slate-400',
          'read-only:bg-slate-100',
          props.className,
        )}
      />
    </div>
  );
}
