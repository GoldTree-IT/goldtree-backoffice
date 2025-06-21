'use client';

import type { UseFormFieldProps } from './type';
import { cn } from '@/lib/utils';

import { useFormField } from '.';
import { Input as Root } from '../ui/input';
import { FormField } from './Field';

type Props = {
  name: string;
} & UseFormFieldProps & React.ComponentProps<typeof Root>;

const Input = (props: Props) => {
  const { formFieldProps, childProps, error } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <Root
        {...childProps}
        data-test={childProps.id}
        className={cn(error ? 'border-destructive focus-visible:ring-destructive ' : '')}
      />
    </FormField>
  );
};

export default Input;
