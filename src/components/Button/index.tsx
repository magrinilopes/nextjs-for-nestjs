import clsx from 'clsx';

type ButtonVariants = 'default' | 'gray' | 'danger' | 'ghost';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

const defaultVariant = clsx(
  'transiition',
  'flex items-center justify-center gap-2',
  'cursor-pointer transition-all duration-200 easy-in-out',
  'disabled:text-slate-400 disabled:bg-slate-200 disabled:cursor-not-allowed',
);

const dictButtonVariant: Record<ButtonVariants, string> = {
  default: clsx(
    defaultVariant,
    'bg-green-600 text-green-50 hover:bg-green-800',
  ),
  gray: clsx(defaultVariant, 'bg-slate-200 text-slate-800 hover:bg-slate-300'),
  danger: clsx(defaultVariant, 'bg-red-200 text-red-950 hover:bg-red-300'),
  ghost: clsx(
    defaultVariant,
    'bg-transparent text-slate-900 hover:bg-slate-300',
  ),
};

const dictButtonSizes: Record<ButtonSizes, string> = {
  sm: clsx(
    'py-1 px-2',
    'text-sm/tight',
    'rounded-sm',
    '[&_svg]:w-3 [&_svg]:h-3',
  ),
  md: clsx(
    'py-2 px-4',
    'text-base/tight',
    'rounded-md',
    '[&_svg]:w-4 [&_svg]:h-4',
  ),
  lg: clsx(
    'py-3 px-6',
    'text-lg/tight',
    'rounded-lg',
    '[&_svg]:w-5 [&_svg]:h-5',
  ),
};

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonClasses = clsx(
    dictButtonVariant[variant],
    dictButtonSizes[size],
    props.className,
  );

  return <button {...props} className={buttonClasses} />;
}
