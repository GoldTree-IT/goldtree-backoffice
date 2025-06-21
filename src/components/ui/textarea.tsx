import { cn } from '@/lib/utils';

import * as React from 'react';

const Textarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      className={cn(
        'flex min-h-16 w-full rounded border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted md:text-sm',
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
