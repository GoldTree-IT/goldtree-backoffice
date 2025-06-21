import { cn } from '@/lib/utils';
import React from 'react';
import { useFieldState } from '.';

const FormDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { formDescriptionId } = useFieldState();
  const { className, ...rest } = props;

  return <p id={formDescriptionId} className={cn('text-[0.8rem] text-muted-foreground', className)} {...rest} />;
};

export { FormDescription };
