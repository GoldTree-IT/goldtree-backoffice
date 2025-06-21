import type { UseFormFieldProps } from './type';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { useFormField } from '.';
import { Input as Root } from '../ui/input';
import { FormField } from './Field';

type Props = {
  name: string;
} & UseFormFieldProps & React.ComponentProps<typeof Root>;

const PasswordInput = (props: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { formFieldProps, childProps, error } = useFormField(props);

  const toggleVisibility = () => setIsVisible(prev => !prev);

  return (
    <div className="*:not-first:mt-2 max-w-[322px]">
      <FormField {...formFieldProps}>
        <div className="relative">
          <Root
            {...childProps}
            data-test={childProps.id}
            type={isVisible ? 'text' : 'password'}
            className={cn('pe-9', error && 'border-destructive focus-visible:ring-destructive')}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
          >
            {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>
      </FormField>
    </div>
  );
};

export default PasswordInput;
