import type { UseFormFieldProps } from './type';
// Pass the `name` prop; registration is handled internally.
import { cn } from '@/lib/utils';
import { useController } from 'react-hook-form';
import { FormLabel, useFormField } from '.';
import { RadioBtnGroupContent, RadioGroupItem, RadioGroup as Root } from '../ui/radio-group';
import { FormField } from './Field';

type Props = {
  name: string;
  options: { label: string; value: string }[];
} & UseFormFieldProps & React.ComponentProps<typeof Root>;

const RadioGroup = (props: Props) => {
  const { formFieldProps, childProps, error } = useFormField(props);
  const { options, name } = props;
  const { field } = useController({ name });

  return (
    <FormField {...formFieldProps}>
      <Root
        onValueChange={field.onChange}
        value={field.value as string}
        className="flex"
        {...childProps}
        data-test={childProps.id}
      >
        {options.map((option: { label: string; value: string }) => {
          const label: string = typeof option === 'string' ? option : option.label;
          const value: string = typeof option === 'string' ? option : option.value;

          return (
            <RadioBtnGroupContent
              key={value}
              className={cn(error && 'border-destructive focus-visible:ring-destructive')}
            >
              <RadioGroupItem value={value} className="after:absolute after:inset-0 cursor-pointer" />
              <FormLabel className="font-normal">{label}</FormLabel>
            </RadioBtnGroupContent>
          );
        })}
      </Root>
    </FormField>
  );
};

export default RadioGroup;
