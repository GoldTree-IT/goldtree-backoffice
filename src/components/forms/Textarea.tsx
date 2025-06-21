import type { UseFormFieldProps } from './type';
import { cn } from '@/lib/utils';

import { useFormField } from '.';
import { Textarea as Root } from '../ui/textarea';
import { FormField } from './Field';

type Props = {
  name: string;
} & UseFormFieldProps & React.ComponentProps<typeof Root>;

const Textarea = (props: Props) => {
  const { formFieldProps, childProps, error } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <Root
        {...childProps}
        data-test={childProps.id}
        aria-invalid={!!error}
        className={cn(childProps.className, error && 'border-destructive focus-visible:ring-destructive')}
      />
    </FormField>
  );
};

export default Textarea;
