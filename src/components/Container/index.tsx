type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className='max-w-screen-lg mx-auto px-8'>{children}</div>;
}
