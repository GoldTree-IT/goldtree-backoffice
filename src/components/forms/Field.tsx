import type { UseFormFieldProps } from './type';
import { useMemo } from 'react';
import { FormItem, FormLabel, FormMessage } from '.';

import { FormFieldContext } from './context';

type Props = {
  id: string;
} & UseFormFieldProps;

const FormField = ({ children, name, label }: Props) => {
  const contextValue = useMemo(() => ({ name }), [name]);
  return (
    <FormFieldContext value={contextValue}>
      <FormItem>
        {label && (
          <FormLabel>
            {label}
          </FormLabel>
        )}
        <div>{children}</div>
        <FormMessage />
      </FormItem>
    </FormFieldContext>
  );
};

export { FormField };
