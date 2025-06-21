'use client';

import type { UseFormFieldProps } from './type';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useFormField } from '.';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FormField } from './Field';

type Props = {
  name: string;
  placeholder?: string;
} & UseFormFieldProps;

const DatePicker = ({ name, placeholder = 'Pick a date', ...props }: Props) => {
  const { register, setValue, getValues } = useFormContext();
  const { formFieldProps, error } = useFormField({ name, ...props });

  const initial = getValues(name) as string | undefined;
  const [selected, setSelected] = useState<Date | undefined>(initial ? new Date(initial) : undefined);

  const handleChange = (date?: Date) => {
    setSelected(date);
    setValue(name, date?.toISOString() ?? '', { shouldValidate: true });
  };

  return (
    <FormField {...formFieldProps}>
      {/* Hidden input to be registered */}
      <input type="hidden" {...register(name)} value={selected?.toISOString() ?? ''} />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className={cn(
              'group w-full justify-between bg-primary-50 px-3 font-medium border border-primary-50 outline-offset-0 hover:bg-primary-50 focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20',
              !selected && 'text-muted-foreground',
              error && 'border-destructive focus-visible:ring-destructive',
            )}
          >
            <span>{selected ? format(selected, 'y/L/dd') : placeholder}</span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleChange}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            classNames={{
              day_selected: 'bg-primary text-white hover:bg-primary/90',
              day_today: 'border border-primary',
            }}
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
};

export default DatePicker;
