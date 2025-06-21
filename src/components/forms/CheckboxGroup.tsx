'use client';

import type { UseFormFieldProps } from './type';
import { cn } from '@/lib/utils';
import { useController } from 'react-hook-form';
import { useFormField } from '.';
import { Checkbox } from '../ui/checkbox';

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: Option[];
  size?: 'sm' | 'lg';
  variant?: 'filled' | 'outline';
} & UseFormFieldProps;

const CheckboxGroup = (props: Props) => {
  const { childProps, error } = useFormField(props);
  const { name, options } = props;
  const { field } = useController({ name });

  const handleToggle = (val: string) => {
    const current: string[] = field.value as string[];
    if (current.includes(val)) {
      field.onChange(current.filter(v => v !== val));
    } else {
      field.onChange([...current, val]);
    }
  };

  return (
    <div className="flex flex-col gap-2" {...childProps}>
      {options.map(({ value }) => (
        <div key={value} className={cn('flex items-center space-x-2', error && 'text-destructive')}>
          <Checkbox
            checked={((field.value as string[]) || []).includes(value)}
            onCheckedChange={() => handleToggle(value)}
            id={`${name}-${value}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
