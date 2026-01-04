/**
 * Card Component
 * Reusable card container with improved hover effects
 */

import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-xl',
      bordered: 'bg-white border border-gray-200 rounded-xl hover:border-primary-200 transition-colors',
      elevated: 'bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300',
      interactive: 'bg-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary-200',
    };

    const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';

    return (
      <div ref={ref} className={cn(variants[variant], hoverClass, className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';
