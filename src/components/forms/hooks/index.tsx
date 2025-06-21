import type { UseFormProps } from 'react-hook-form';
import type { UseFormFieldProps } from '../type';
import { zodResolver } from '@hookform/resolvers/zod';
import { use } from 'react';
import { useFormContext, useForm as useRHForm } from 'react-hook-form';

import { z } from 'zod';
import { FormFieldContext, FormItemContext } from '../context';

const isFieldRequired = (fieldSchema: z.ZodTypeAny | undefined): boolean => {
  if (!fieldSchema) {
    return false;
  }
  return !(fieldSchema instanceof z.ZodOptional || fieldSchema instanceof z.ZodDefault);
};

const useFormField = <P extends UseFormFieldProps & { label: string }>(props: P) => {
  const { label, name, ...otherProps } = props;
  const id = name;

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(name, formState);

  return {
    formFieldProps: { id, name, label },
    childProps: { ...otherProps, id, name },
    ...fieldState,
  };
};

const useFieldState = () => {
  const fieldContext = use(FormFieldContext);
  const itemContext = use(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const _schema = (useFormContext() as unknown as typeof useFormContext & { _schema?: z.ZodSchema })._schema;

  const fieldState = getFieldState(fieldContext.name, formState);

  const fieldSchema
    = _schema instanceof z.ZodObject ? (_schema.shape as Record<string, z.ZodTypeAny>)?.[fieldContext.name] : undefined;
  const isRequired = isFieldRequired(fieldSchema);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    isRequired,
    ...fieldState,
  };
};

type UseZodFormProps<S extends z.ZodSchema> = {
  schema: S;
} & Exclude<UseFormProps<z.infer<S>>, 'resolver'>;

const useForm = <S extends z.ZodSchema>({ schema, ...formConfigs }: UseZodFormProps<S>) => {
  const methods = useRHForm<z.infer<S>>({
    ...formConfigs,
    resolver: zodResolver(schema),
  });

  (methods as typeof methods & { _schema: S })._schema = schema;

  return methods;
};

export { isFieldRequired, useFieldState, useForm, useFormField };
