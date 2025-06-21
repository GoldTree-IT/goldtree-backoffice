import type { FieldPath, FieldValues } from 'react-hook-form';
import { createContext } from 'react';

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export { FormFieldContext, FormItemContext };
