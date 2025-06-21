import type { PropsWithChildren } from 'react';

export type UseFormFieldProps = {
  name: string;
  label: string;
  isRequired?: boolean;
} & PropsWithChildren;
