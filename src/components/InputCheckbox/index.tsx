import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  type?: 'checkbox';
  labelText?: string;
  labelCheck: string;
} & React.ComponentProps<'input'>;

export function InputCheckbox({
  type = 'checkbox',
  labelText = '',
  labelCheck,
  ...props
}: InputCheckboxProps) {
  const id = useId();
  return (
    <div className='flex flex-col gap-1 group'>
      {labelText && <span className='text-sm'>{labelText}</span>}
      <div className='flex items-center gap-2'>
        <input
          {...props}
          id={id}
          type={type}
          className={clsx(
            'w-4 h-4 outline-none focus:ring-2 focus:ring-blue-500',
            props.className,
          )}
        />
        {labelCheck && (
          <label className='text-sm' htmlFor={id}>
            {labelCheck}
          </label>
        )}
      </div>
    </div>
  );
}
