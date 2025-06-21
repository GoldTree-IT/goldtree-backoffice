import { cn } from '@/lib/utils';
import React from 'react';

import { useFieldState } from '.';

const FormMessage = ({ ref, className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { error, formMessageId } = useFieldState();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p ref={ref} id={formMessageId} className={cn('text-sm  font-medium text-destructive', className)} {...props}>
      {body}
    </p>
  );
};

FormMessage.displayName = 'FormMessage';

export { FormMessage };
