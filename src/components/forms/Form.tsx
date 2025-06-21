import type { ComponentProps } from 'react';

import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

const Form = <T extends FieldValues>({ form, onSubmit, children, ...props }: Props<T>) => {
  const { formState } = form;
  const isSubmitting = formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props} className="w-full">
        <fieldset disabled={isSubmitting}>{children}</fieldset>
      </form>
    </FormProvider>
  );
};

export { Form };
