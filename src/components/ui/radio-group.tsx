'use client';

import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Circle } from 'lucide-react';
import React from 'react';
import { buttonVariants } from './button';

/**
 * A wrapper component for the `RadioGroupPrimitive.Root` that applies custom styling and forwards all props.
 *
 * @param className - Additional CSS classes to apply to the radio group container.
 * @param name - The name attribute for the radio group, used for form registration and identification.
 * @param props - Additional props forwarded to the underlying `RadioGroupPrimitive.Root` component.
 *
 * @example
 * ```tsx
 * <RadioGroup name="gender" className="my-custom-class">
 *   <RadioGroup.Item value="male">Male</RadioGroup.Item>
 *   <RadioGroup.Item value="female">Female</RadioGroup.Item>
 * </RadioGroup>
 * ```
 */
function RadioGroup({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export type RadioBtnGroupContentProps = {
  isLoading?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof buttonVariants>;

function RadioBtnGroupContent({ variant = 'outline', size, className, children, ...props }: RadioBtnGroupContentProps) {
  return (
    <div
      className={cn('relative flex items-center gap-2 cursor-pointer', buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { RadioBtnGroupContent, RadioGroup, RadioGroupItem };
