import type * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import { useFieldState } from '.';
import { Label } from '../ui/label';

export function FormLabel(props: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  const { className, ...rest } = props;
  const { formItemId, isRequired } = useFieldState();

  return (
    <div className="flex">
      <Label className={cn('font-bold', className)} htmlFor={formItemId} {...rest} />

      {isRequired && <span className="text-destructive">*</span>}
    </div>
  );
}
