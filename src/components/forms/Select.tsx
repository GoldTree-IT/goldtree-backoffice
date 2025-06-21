'use client';

import type { UseFormFieldProps } from './type';
import { cn } from '@/lib/utils';
import { useController } from 'react-hook-form';
import { useFormField } from '.';
import {
  Select as Root,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FormField } from './Field';

type Props = {
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
} & UseFormFieldProps & React.ComponentProps<typeof Root>;

const Select = (props: Props) => {
  const { formFieldProps, childProps, error } = useFormField(props);

  const { options, name, placeholder } = props;
  const { field } = useController({ name });

  return (
    <FormField {...formFieldProps} {...props}>
      <Root {...childProps} onValueChange={field.onChange} defaultValue={field.value as string}>
        <SelectTrigger
          id={name}
          className={cn(error ? 'border-destructive focus-visible:ring-destructive' : '')}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const label = typeof option === 'string' ? option : option.label;
            const value = typeof option === 'string' ? option : option.value;
            return (
              <SelectItem key={value} value={value.toString()}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Root>
    </FormField>
  );
};

Select.displayName = 'Select';

export default Select;
