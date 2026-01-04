/**
 * Input Component
 * Reusable form input with improved visual states
 */

import React from 'react';
import { cn } from '@/shared/utils/cn';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, success, type = 'text', ...props }, ref) => {
    const inputId = props.id || props.name || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200',
              'placeholder:text-gray-400',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50/50'
                : success
                ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-green-50/50'
                : 'border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 bg-white hover:border-gray-300',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200',
              (error || success) && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Icon indicators */}
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          {success && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 flex items-start gap-1">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
