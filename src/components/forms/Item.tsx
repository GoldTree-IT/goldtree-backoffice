import { cn } from '@/lib/utils';
import React from 'react';

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = ({ ref, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const id = React.useId();

  return (
    <FormItemContext value={{ id }}>
      <div ref={ref} className={cn('flex flex-col space-y-2')} {...props}>
        {children}
      </div>
    </FormItemContext>
  );
};
FormItem.displayName = 'FormItem';
export { FormItem };
