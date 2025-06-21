import type { UseFormFieldProps } from './type';
import * as React from 'react';

import { useController } from 'react-hook-form';
import { useFormField } from '.';
import { Switch as Root } from '../ui/switch';

type Props = {
  name: string;
} & UseFormFieldProps & React.ComponentProps<typeof Root>;

export const SwitchInput = ({ ...props }: Props) => {
  const { childProps } = useFormField(props);

  const { name } = props;

  const { field } = useController({ name });

  return (
    <div className="flex items-center gap-3">
      <Root onCheckedChange={field.onChange} defaultChecked={field.value as boolean} {...childProps} />
      <span className="text-[14px] font-medium">
        {props.label}
      </span>
    </div>
  );
};
