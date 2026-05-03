import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const inputBase =
  'w-full bg-white border border-black/20 text-black font-sans text-sm px-4 py-3 focus:outline-none focus:border-black transition-colors placeholder:text-black/40';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-widest text-black/60">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} className={`${inputBase} ${error ? 'border-red' : ''} ${className}`} {...props} />
        {error && <p className="text-xs text-red">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-widest text-black/60">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`${inputBase} resize-none ${error ? 'border-red' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export default Input;
