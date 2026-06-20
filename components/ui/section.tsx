import * as React from 'react';
import { cn } from '@/lib/utils';

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn('py-16 sm:py-24 lg:py-32', className)}
    {...props}
  />
));
Section.displayName = 'Section';

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mx-auto max-w-3xl text-center mb-12 lg:mb-16', className)}
    {...props}
  />
));
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
      className
    )}
    {...props}
  />
));
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('mt-4 text-lg text-muted-foreground', className)}
    {...props}
  />
));
SectionDescription.displayName = 'SectionDescription';

export { Section, SectionHeader, SectionTitle, SectionDescription };
